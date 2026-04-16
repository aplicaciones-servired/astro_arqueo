import dotenv from "dotenv";
import nodemailer from "nodemailer";
import type { Request } from "express";

dotenv.config();

const SENSITIVE_KEYS = new Set([
  "password",
  "pass",
  "token",
  "secret",
  "authorization",
  "cookie",
  "accesskey",
  "secretkey",
]);

const redactValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(redactValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        SENSITIVE_KEYS.has(key.toLowerCase()) ? "[REDACTED]" : redactValue(item),
      ])
    );
  }

  return value;
};

const formatError = (error: unknown): Record<string, unknown> => {
  const currentError = error as Record<string, any>;
  const original = currentError?.original ?? {};

  return {
    name: currentError?.name,
    message: currentError?.message ?? String(error),
    stack: currentError?.stack,
    code: currentError?.code ?? original?.code,
    errno: currentError?.errno ?? original?.errno,
    sqlMessage: original?.sqlMessage,
    sqlState: original?.sqlState,
    sql: original?.sql,
  };
};

const detectDiagnosis = (errorInfo: Record<string, unknown>) => {
  const message = String(errorInfo.message || "").toLowerCase();
  const sqlMessage = String(errorInfo.sqlMessage || "").toLowerCase();
  const code = String(errorInfo.code || "").toLowerCase();
  const combined = `${message} ${sqlMessage} ${code}`;

  if (combined.includes("eaddrinuse")) {
    return {
      category: "Puerto ocupado",
      probableCause: "Otro proceso ya está escuchando en el mismo puerto del backend.",
      howToFix: [
        "Detener la instancia previa del servidor.",
        "Cambiar la variable PORT a un puerto libre.",
        "Verificar qué proceso usa el puerto antes de reiniciar.",
      ],
    };
  }

  if (combined.includes("econnrefused") || combined.includes("connection refused")) {
    return {
      category: "Conexión rechazada",
      probableCause: "El backend no pudo conectarse a una base de datos, MinIO o servicio externo.",
      howToFix: [
        "Confirmar host, puerto y credenciales del servicio externo.",
        "Validar que el servicio esté en ejecución y accesible desde el servidor.",
        "Revisar red, firewall y variables de entorno.",
      ],
    };
  }

  if (combined.includes("duplicate entry") || combined.includes("er_dup_entry")) {
    return {
      category: "Registro duplicado",
      probableCause: "Se intentó insertar un valor que ya existe en un campo único o índice único.",
      howToFix: [
        "Revisar el valor que se está insertando y validar si ya existe.",
        "Corregir la lógica para evitar doble envío o doble inserción.",
        "Verificar si el identificador único se genera de forma correcta.",
      ],
    };
  }

  if (combined.includes("foreign key constraint fails") || combined.includes("er_no_referenced_row_2")) {
    return {
      category: "Restricción de clave foránea",
      probableCause: "El registro depende de otro que no existe o está fuera de sincronía.",
      howToFix: [
        "Confirmar que el registro padre exista antes de insertar o actualizar.",
        "Revisar el orden de las operaciones relacionadas.",
        "Verificar la integridad referencial en la base de datos.",
      ],
    };
  }

  if (combined.includes("access denied") || combined.includes("er_access_denied_error")) {
    return {
      category: "Acceso denegado",
      probableCause: "Las credenciales de base de datos o SMTP no son válidas o no tienen permisos.",
      howToFix: [
        "Revisar usuario y contraseña en el archivo .env.",
        "Confirmar permisos del usuario en el motor de base de datos o en el proveedor de correo.",
        "Validar que el host correcto esté configurado.",
      ],
    };
  }

  if (combined.includes("timeout") || combined.includes("etimedout")) {
    return {
      category: "Tiempo de espera agotado",
      probableCause: "Un servicio tardó demasiado en responder o quedó inaccesible temporalmente.",
      howToFix: [
        "Revisar conectividad de red y latencia.",
        "Aumentar el timeout si el servicio legítimamente tarda más.",
        "Verificar carga del servidor destino.",
      ],
    };
  }

  if (combined.includes("syntax error") || combined.includes("sql syntax") || combined.includes("er_parse_error")) {
    return {
      category: "Error de sintaxis SQL",
      probableCause: "La consulta SQL se generó con una estructura inválida.",
      howToFix: [
        "Revisar la consulta generada y los valores interpolados.",
        "Validar nombres de tablas, columnas y filtros dinámicos.",
        "Probar la sentencia directamente en la base de datos.",
      ],
    };
  }

  return {
    category: "Error no clasificado",
    probableCause: "El error no coincide con una firma conocida, pero el stack y el detalle técnico permiten rastrearlo.",
    howToFix: [
      "Revisar el stack completo y el SQL/causa original si existe.",
      "Confirmar los datos de entrada de la request.",
      "Cruzar este correo con los logs del servidor en el mismo timestamp.",
    ],
  };
};

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
};

export interface ErrorMailContext {
  controller: string;
  req?: Pick<Request, "method" | "originalUrl" | "params" | "query" | "body" | "ip">;
  error: unknown;
  extra?: Record<string, unknown>;
}

export const notifyBackendError = async ({
  controller,
  req,
  error,
  extra = {},
}: ErrorMailContext): Promise<void> => {
  const recipient = process.env.ERROR_REPORT_RECIPIENT_EMAIL || "aplicaciones@gruposervired.com.co";
  const sender = process.env.ERROR_REPORT_SENDER_EMAIL || process.env.SMTP_USER;
  const transporter = getTransporter();

  if (!transporter || !sender || !recipient) {
    console.warn(`No se pudo enviar correo de error para ${controller}: faltan credenciales SMTP.`);
    return;
  }

  const errorInfo = formatError(error);
  const diagnosis = detectDiagnosis(errorInfo);
  const requestInfo = req
    ? {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        params: redactValue(req.params),
        query: redactValue(req.query),
        body: redactValue(req.body),
      }
    : undefined;

  const sections: Array<string> = [
    `Controlador: ${controller}`,
    `Fecha: ${new Date().toISOString()}`,
    `Entorno: ${process.env.NODE_ENV || "development"}`,
    `Host: ${process.env.HOSTNAME || "local"}`,
    ``,
    `Error:`,
    JSON.stringify(errorInfo, null, 2),
    ``,
    `Diagnóstico probable:`,
    `- Categoría: ${diagnosis.category}`,
    `- Posible causa: ${diagnosis.probableCause}`,
    `- Cómo solucionarlo:`,
    ...diagnosis.howToFix.map((step) => `  - ${step}`),
  ];

  if (requestInfo) {
    sections.push(``, `Request:`, JSON.stringify(requestInfo, null, 2));
  }

  if (Object.keys(extra).length > 0) {
    sections.push(``, `Extra:`, JSON.stringify(extra, null, 2));
  }

  try {
    await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: `[astro_arqueo] Error en ${controller}`,
      text: sections.join("\n"),
    });
  } catch (mailError) {
    console.error(`No se pudo enviar el correo de error para ${controller}:`, mailError);
  }
};