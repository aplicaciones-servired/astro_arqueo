import { API_URL } from "@/utils/constans";
import axios from "axios";

interface ArqueoManual {
  puntodeventa: string;
  nombre: string;
  documento: string;
  base: string;
  ventabruta: string;
  totalingreso: string;
  efectivocajafuerte: string;
  sobrantefaltante: string;
  valor: string;
  empresa: string;
  imagen?: File | null;
}

interface ArqueoManualResult {
  ok: boolean;
  message: string;
}

const MAX_UPLOAD_MB = 50;
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

const getErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "Error inesperado al registrar el arqueo manual.";
  }

  const status = error.response?.status;
  const responseData = error.response?.data as { message?: string; error?: string } | string | undefined;
  const backendMessage = typeof responseData === "string"
    ? responseData
    : responseData?.message || responseData?.error;

  if (backendMessage) {
    if (backendMessage.includes("File too large")) {
      return `El archivo excede el tamano maximo permitido (${MAX_UPLOAD_MB}MB).`;
    }
    if (backendMessage.includes("Solo se permiten archivos")) {
      return "Solo se permiten archivos de imagen (PNG, JPG, GIF) o PDF.";
    }
    return backendMessage;
  }

  if (error.code === "ECONNABORTED") {
    return "La solicitud tardo demasiado. Intenta nuevamente.";
  }

  if (!error.response) {
    return "No hay conexion con el servidor. Verifica red o VPN.";
  }

  if (status === 400) return "Datos invalidos o incompletos. Revisa el formulario.";
  if (status === 401 || status === 403) return "No tienes permisos para realizar esta accion.";
  if (status === 404) return "No se encontro el servicio de arqueo manual.";
  if (status === 413) return `El archivo excede el tamano maximo permitido (${MAX_UPLOAD_MB}MB).`;
  if (status === 415) return "Formato de archivo no permitido. Usa imagen o PDF.";
  if (status === 422) return "No se pudo procesar la informacion enviada.";
  if (status && status >= 500) return "Error interno del servidor al guardar el arqueo manual.";

  return error.message || "Error de red al registrar el arqueo manual.";
};

export async function ArqueoManualForm({
  puntodeventa,
  nombre,
  documento,
  base,
  ventabruta,
  totalingreso,
  efectivocajafuerte,
  sobrantefaltante,
  valor,
  empresa,
  imagen,
}: ArqueoManual): Promise<ArqueoManualResult> {

  if (!empresa) {
    return { ok: false, message: "Selecciona una empresa antes de insertar." };
  }

  const requiredFields: Array<{ value: string; label: string }> = [
    { value: puntodeventa, label: "Punto de venta" },
    { value: nombre, label: "Nombre de la asesora" },
    { value: documento, label: "Documento de la asesora" },
    { value: base, label: "Base" },
    { value: ventabruta, label: "Venta bruta" },
    { value: totalingreso, label: "Total ingreso" },
    { value: efectivocajafuerte, label: "Efectivo" },
    { value: sobrantefaltante, label: "Sobrante/Faltante" },
    { value: valor, label: "Valor" },
  ];

  const missingField = requiredFields.find((field) => !field.value?.trim());
  if (missingField) {
    return { ok: false, message: `El campo \"${missingField.label}\" es obligatorio.` };
  }

  if (!imagen) {
    return { ok: false, message: "Debes adjuntar una imagen o PDF antes de insertar." };
  }

  const isValidMimeType = imagen.type.startsWith("image/") || imagen.type === "application/pdf";
  if (!isValidMimeType) {
    return { ok: false, message: "Solo se permiten archivos de imagen (PNG, JPG, GIF) o PDF." };
  }

  if (imagen.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: `El archivo excede el tamano maximo permitido (${MAX_UPLOAD_MB}MB).` };
  }

  try {
    // Crear FormData para enviar datos y archivo
    const formData = new FormData();
    formData.append('puntodeventa', puntodeventa);
    formData.append('nombre', nombre);
    formData.append('documento', documento);
    formData.append('base', base);
    formData.append('ventabruta', ventabruta);
    formData.append('totalingreso', totalingreso);
    formData.append('efectivocajafuerte', efectivocajafuerte);
    formData.append('sobrantefaltante', sobrantefaltante);
    formData.append('valor', valor);
    
    // Agregar imagen si existe
    if (imagen) {
      formData.append('imagen', imagen);
    }

    const response = await axios.post(`${API_URL}/arqueomanual/${empresa}`, formData);

    if (response.status === 200 || response.status === 201) {
      return { ok: true, message: "Se registro correctamente el arqueo manual." };
    }

    return { ok: false, message: "No fue posible registrar el arqueo manual." };
  } catch (error) {
    console.error("Error en ArqueoManualForm:", error);
    return { ok: false, message: getErrorMessage(error) };
  }
}
