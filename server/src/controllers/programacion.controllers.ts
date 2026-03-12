import { Op } from "sequelize";
import {
  initCronograma,
  getProgramacion,
} from "../models/programacion.model";
import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { getPoolArqueo } from "../connections/dbArqueo";
import { MINIO_PUBLIC_ORIGIN } from "../connections/minio";
import { randomUUID } from "crypto";

interface TableColumnInfo {
  Field: string;
  Type: string;
  Null: "YES" | "NO";
  Key: string;
  Default: any;
  Extra: string;
}

const normalizeZona = (zona: string | undefined): string =>
  (zona || "").trim().toLowerCase();

const isJamundiZona = (zona: string | undefined): boolean => {
  const normalized = normalizeZona(zona);
  return normalized === "jamundi" || normalized === "multiredyservired";
};

const normalizeMinioPublicUrl = (
  value: string | null | undefined
): string | null => {
  if (!value) return null;
  try {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      const parsed = new URL(value);
      if (parsed.origin !== MINIO_PUBLIC_ORIGIN) {
        return value.replace(parsed.origin, MINIO_PUBLIC_ORIGIN);
      }
    }
    return value;
  } catch {
    return value;
  }
};

const normalizeCronogramaImage = (image: any): string | null => {
  if (!image) return null;

  const normalizeStringImage = (rawValue: string): string | null => {
    const value = rawValue.trim().replace(/^['"]|['"]$/g, "");
    if (!value) return null;

    // Caso mal formado visto en logs: data:image/...;base64,http://... -> usar la URL real
    const malformedDataUriUrl = value.match(
      /^data:image\/[a-zA-Z0-9+.-]+;base64,\s*(https?:\/\/.*)$/i
    );
    if (malformedDataUriUrl?.[1]) {
      return normalizeMinioPublicUrl(malformedDataUriUrl[1].trim());
    }

    if (value.startsWith("http://") || value.startsWith("https://")) {
      return normalizeMinioPublicUrl(value);
    }
    if (value.startsWith("data:image")) return value;
    if (value.startsWith("iVBOR")) return `data:image/png;base64,${value}`;
    if (value.startsWith("/9j/")) return `data:image/jpeg;base64,${value}`;
    return `data:image/jpeg;base64,${value}`;
  };

  let buffer: Buffer | null = null;
  if (Buffer.isBuffer(image)) {
    buffer = image;
  } else if (typeof image === "object" && image !== null && "data" in image) {
    buffer = Buffer.from((image as { data: number[] }).data);
  }

  if (buffer) {
    const header = buffer.slice(0, 4).toString("hex").toUpperCase();
    if (header.startsWith("89504E47")) {
      return `data:image/png;base64,${buffer.toString("base64")}`;
    }
    if (header.startsWith("FFD8FF")) {
      return `data:image/jpeg;base64,${buffer.toString("base64")}`;
    }

    const asText = buffer.toString("utf-8").trim();
    const normalizedTextImage = normalizeStringImage(asText);
    if (normalizedTextImage) return normalizedTextImage;

    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  }

  if (typeof image === "string") {
    return normalizeStringImage(image);
  }

  return null;
};

export const PostProgramacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  const zona = data.empresa;
  const puntodeventa = data.puntovdt;
  const dia = data.fecha;
  const nota = data.nota;

  const normalizedZona = normalizeZona(zona);
  const isMultired = normalizedZona === "multired";
  const empresa = isMultired ? "Multired" : "Servired";
  const targetTable = isMultired
    ? "cronograma_multired"
    : "cronograma_servired";

  try {
    const columns = await getPoolArqueo.query<TableColumnInfo>(
      `SHOW COLUMNS FROM \`${targetTable}\``,
      { type: QueryTypes.SELECT }
    );

    const columnNames = new Set(columns.map((c) => c.Field));
    const payload: Record<string, any> = {
      puntodeventa,
      dia,
      empresa,
      nota,
      estado: "En Espera",
    };

    const idColumn = columns.find((c) => c.Field === "id");
    const idIsRequiredWithoutDefault =
      !!idColumn &&
      idColumn.Null === "NO" &&
      idColumn.Default == null &&
      !idColumn.Extra.toLowerCase().includes("auto_increment");

    if (idIsRequiredWithoutDefault) {
      if (/int/i.test(idColumn.Type)) {
        const [nextIdRow] = await getPoolArqueo.query<{ nextId: number }>(
          `SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM \`${targetTable}\``,
          { type: QueryTypes.SELECT }
        );
        payload.id = (nextIdRow as any).nextId;
      } else {
        payload.id = randomUUID();
      }
    }

    const insertEntries = Object.entries(payload).filter(([key]) =>
      columnNames.has(key)
    );

    const insertColumns = insertEntries.map(([key]) => `\`${key}\``).join(", ");
    const insertValues = insertEntries
      .map(([key]) => `:${key}`)
      .join(", ");
    const replacements = Object.fromEntries(insertEntries);

    await getPoolArqueo.query(
      `INSERT INTO \`${targetTable}\` (${insertColumns})
       VALUES (${insertValues})`,
      {
        replacements,
        type: QueryTypes.INSERT,
      }
    );

    res.status(200).json({
      message: "Programacion creada",
      data: {
        puntodeventa,
        dia,
        empresa,
        nota,
        tablaDestino: targetTable,
      },
    });
  } catch (error: any) {
    console.error("Error al crear programacion:", error);
    res.status(500).json({
      message: "Error al crear la programacion",
      detail: error?.original?.sqlMessage || error?.message || "Unknown error",
    });
  }
};

export const Programacionget = async (
  req: Request,
  res: Response
): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 1;
  const offset = (page - 1) * pageSize;
  const zona = req.query.zona as string;
  const fechaInicio = req.query.fechaInicio as string;
  const fechaFin = req.query.fechaFin as string;
  const fecha = req.query.fecha as string; // Filtro de fecha específica
  const pdv = req.query.pdv as string; // Filtro de punto de venta

  if (!zona) {
    res.status(400).json("Zona no válida");
    return;
  }

  const normalizedZona = normalizeZona(zona);
  const isMultired = normalizedZona === "multired";

  // Para Servired/Jamundi/otros no-Multired, combinar tabla vieja y nueva.
  if (!isMultired) {
    const whereParts: string[] = [];
    const replacements: Record<string, any> = { pageSize, offset };

    if (fechaInicio && fechaFin) {
      whereParts.push("dia BETWEEN :fechaInicio AND :fechaFin");
      replacements.fechaInicio = fechaInicio;
      replacements.fechaFin = fechaFin;
    } else if (fecha) {
      whereParts.push("dia LIKE :fecha");
      replacements.fecha = `${fecha}%`;
    }

    if (pdv) {
      whereParts.push("puntodeventa LIKE :pdv");
      replacements.pdv = `%${pdv}%`;
    }

    const whereSQL =
      whereParts.length > 0 ? `WHERE ${whereParts.join(" AND ")}` : "";

    const cols = "id, puntodeventa, dia, empresa, nota, estado";

    const countSQL = `
      SELECT COUNT(*) AS total FROM (
        SELECT id FROM \`cronograma\` ${whereSQL}
        UNION ALL
        SELECT id FROM \`cronograma_servired\` ${whereSQL}
      ) AS combined`;

    const dataSQL = `
      SELECT ${cols} FROM \`cronograma\` ${whereSQL}
      UNION ALL
      SELECT ${cols} FROM \`cronograma_servired\` ${whereSQL}
      ORDER BY dia DESC, id DESC
      LIMIT :pageSize OFFSET :offset`;

    try {
      const [countResult] = await getPoolArqueo.query<{ total: number }>(
        countSQL,
        {
          replacements,
          type: QueryTypes.SELECT,
        }
      );

      const datos = await getPoolArqueo.query<any>(dataSQL, {
        replacements,
        type: QueryTypes.SELECT,
      });

      res
        .status(200)
        .json({ count: (countResult as any).total, datos, page, pageSize });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCronograma(empresa);

  let whereClause: any = {};

  if (fechaInicio && fechaFin) {
    whereClause.dia = {
      [Op.between]: [fechaInicio, fechaFin],
    };
  }

  // Filtro por fecha específica
  if (fecha) {
    whereClause.dia = {
      [Op.like]: `${fecha}%`, // Busca fechas que comiencen con la fecha dada
    };
  }

  // Filtro por punto de venta
  if (pdv) {
    whereClause.puntodeventa = {
      [Op.like]: `%${pdv}%`, // Busca puntos de venta que contengan el texto
    };
  }

  try {
    const Getcrono = await getProgramacion.findAll({
      attributes: [
        "id",
        "puntodeventa",
        "dia",
        "empresa",
        "nota",
        "estado",
      ],
      where: whereClause,
      limit: pageSize,
      offset: offset,
      order: [["dia", "DESC"]],
    });

    const count = await getProgramacion.count({ where: whereClause });

    res.status(200).json({ count: count, datos: Getcrono, page, pageSize });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateProgramacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { estado, fecha, nota, zona } = req.body;

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCronograma(empresa);

  try {
    const cronograma = await getProgramacion.findByPk(id);

    if (!cronograma) {
      res.status(404).json({ message: "Cronograma no encontrado" });
      return;
    }

    await cronograma.update({
      estado: estado || cronograma.estado,
      dia: fecha || cronograma.dia,
      nota: nota !== undefined ? nota : cronograma.nota,
    });

    res.status(200).json({ 
      message: "Cronograma actualizado exitosamente", 
      data: cronograma 
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el cronograma", error });
  }
};

export const GetProgramacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.params;
  const { zona, id } = data;

  const normalizedZona = normalizeZona(zona);
  const isMultired = normalizedZona === "multired";

  if (!isMultired) {
    const cols = `id, puntodeventa, dia, empresa, nota, estado, imagen, observacion`;
    const sql = `
      SELECT ${cols} FROM \`cronograma\` WHERE id = :id
      UNION ALL
      SELECT ${cols} FROM \`cronograma_servired\` WHERE id = :id
      ORDER BY dia DESC`;

    try {
      const rows = await getPoolArqueo.query<any>(sql, {
        replacements: { id },
        type: QueryTypes.SELECT,
      });

      const datos = rows.map((item: any) => ({
        ...item,
        imagen: normalizeCronogramaImage(item.imagen),
      }));

      res.status(200).json({ datos });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCronograma(empresa);

  try {
    const getprogramacion = await getProgramacion.findAll({
      attributes: [
        "id",
        "puntodeventa",
        "dia",
        "empresa",
        "nota",
        "estado",
        "imagen",
        "observacion"
      ],
      where: { id: id },
      order: [["dia", "DESC"]],
    });

    const originalString = getprogramacion.map((item: any) => {
      return {
        ...item.toJSON(),
        imagen: normalizeCronogramaImage(item.imagen),
      };
    });

    // ✅ Enviamos el array ya transformado
    res.status(200).json({ datos: originalString });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const ProgramacionInforme = async (
  req: Request,
  res: Response
): Promise<void> => {
  const zona = req.query.zona as string;
  const fechaInicio = req.query.fechaInicio as string;
  const fechaFin = req.query.fechaFin as string;

  const normalizedZona = normalizeZona(zona);
  const isMultired = normalizedZona === "multired";

  if (!isMultired) {
    const whereParts: string[] = [];
    const replacements: Record<string, any> = {};

    if (fechaInicio && fechaFin) {
      whereParts.push("dia BETWEEN :fechaInicio AND :fechaFin");
      replacements.fechaInicio = fechaInicio;
      replacements.fechaFin = fechaFin;
    }

    const whereSQL =
      whereParts.length > 0 ? `WHERE ${whereParts.join(" AND ")}` : "";

    const cols = "id, puntodeventa, dia, empresa, nota, estado";

    const countSQL = `
      SELECT COUNT(*) AS total FROM (
        SELECT id FROM \`cronograma\` ${whereSQL}
        UNION ALL
        SELECT id FROM \`cronograma_servired\` ${whereSQL}
      ) AS combined`;

    const dataSQL = `
      SELECT ${cols} FROM \`cronograma\` ${whereSQL}
      UNION ALL
      SELECT ${cols} FROM \`cronograma_servired\` ${whereSQL}
      ORDER BY dia DESC, id DESC`;

    try {
      const [countResult] = await getPoolArqueo.query<{ total: number }>(
        countSQL,
        {
          replacements,
          type: QueryTypes.SELECT,
        }
      );

      const datos = await getPoolArqueo.query<any>(dataSQL, {
        replacements,
        type: QueryTypes.SELECT,
      });

      res.status(200).json({ count: (countResult as any).total, datos });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCronograma(empresa);

  const Op = require("sequelize").Op;

  // 🔥 Solo aplicar filtro de fechas si ambas están presentes
  const whereClause: any = {
    empresa: empresa,
  };

  if (fechaInicio && fechaFin) {
    whereClause.dia = {
      [Op.between]: [fechaInicio, fechaFin],
    };
  }

  try {
    const { count, rows } = await getProgramacion.findAndCountAll({
      attributes: ["id", "puntodeventa", "dia", "empresa", "nota", "estado"],
      where: whereClause,
      order: [["dia", "DESC"]],
    });
    res.status(200).json({ count, datos: rows });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const EliminarProgramacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.query.id as string;
  const zona = req.query.zona as string;

  console.log('first', id, zona);

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCronograma(empresa);

  try {
     const eliminar = await getProgramacion.destroy({
      where: { id: id },
    });
    console.log('first', eliminar)
    res.status(200).json({ message: "Cronograma eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "error al eliminar el cronograma" });
  }
};

