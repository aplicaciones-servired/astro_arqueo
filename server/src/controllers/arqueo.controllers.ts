import { Request, Response } from "express";
import { TBUsuarios } from "../models/Tbusuario.model";
import { getPoolArqueo } from "../connections/dbArqueo";
import { QueryTypes } from "sequelize";
import { MINIO_PUBLIC_ORIGIN } from "../connections/minio";

// Convierte una URL de MinIO almacenada en BD (puede tener hostname interno Docker como 'minio')
// a una URL accesible desde el navegador usando MINIO_PUBLIC_ORIGIN.
// El bucket es público, no se necesitan URLs presignadas.
const fixMinIOUrl = (value: string | null | undefined): string | null => {
  if (!value) return null;
  try {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      const parsed = new URL(value);
      const internalOrigin = parsed.origin;
      if (internalOrigin !== MINIO_PUBLIC_ORIGIN) {
        return value.replace(internalOrigin, MINIO_PUBLIC_ORIGIN);
      }
    }
    return value;
  } catch {
    return value;
  }
};

export const getArqueo = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;
  const zona = req.query.zona as string;
  const fechavisita = req.query.fechavisita as string;
  const puntodeventa = req.query.puntodeventa as string;
  const fechaInicio = req.query.fechaInicio as string;
  const fechaFin = req.query.fechaFin as string;

  if (zona === undefined) {
    res.status(400).json("Zona no válida");
    return;
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  const tablePrincipal =
    empresa === "Multired"
      ? "registro_arqueo_multired"
      : "registro_arqueo_servired";
  const tableBackup = `${tablePrincipal}_backup`;

  // Construir condiciones WHERE dinámicas para SQL raw
  const whereParts: string[] = [];
  const replacements: Record<string, any> = { pageSize, offset };

  if (fechaInicio && fechaFin) {
    whereParts.push("fechavisita BETWEEN :fechaInicio AND :fechaFin");
    replacements.fechaInicio = fechaInicio;
    replacements.fechaFin = fechaFin;
  } else if (fechavisita) {
    whereParts.push("fechavisita = :fechavisita");
    replacements.fechavisita = fechavisita;
  }
  if (puntodeventa) {
    whereParts.push("puntodeventa LIKE :puntodeventa");
    replacements.puntodeventa = `%${puntodeventa}%`;
  }
  const whereSQL = whereParts.length > 0 ? `WHERE ${whereParts.join(" AND ")}` : "";

  const cols = `supervisor, id, ip, nombres, documento, sucursal, puntodeventa,
    ventabruta, baseefectivo, cartera, totalingreso, chancesabonados, chancespreimpresos,
    premiospagados, efectivocajafuerte, tirillarecaudo, totalegresos, totalbilletes,
    totalmonedas, totalarqueo, sobrantefaltante, totalbilletescaja, totalmonedascaja,
    totalpremioscaja, total, rollos_bnet, rollos_fisicos, diferencia,
    nombre_juego, cantidad_bnet, cantidad_fisicos, cantidad_faltante, cantidad_tiquete, descargado,
    nombre_juego2, cantidad_bnet2, cantidad_fisicos2, cantidad_faltante2, cantidad_tiquete2, descargado2,
    nombre_juego3, cantidad_bnet3, cantidad_fisicos3, cantidad_faltante3, cantidad_tiquete3, descargado3,
    nombre_juego4, cantidad_bnet4, cantidad_fisicos4, cantidad_faltante4, cantidad_tiquete4, descargado4,
    nombre_juego5, cantidad_bnet5, cantidad_fisicos5, cantidad_faltante5, cantidad_tiquete5, descargado5,
    nombre_juego6, cantidad_bnet6, cantidad_fisicos6, cantidad_faltante6, cantidad_tiquete6, descargado6,
    nombre_juego7, cantidad_bnet7, cantidad_fisicos7, cantidad_faltante7, cantidad_tiquete7, descargado7,
    totaldescargados, totalvalor,
    requisito1, observacion1, requisito2, observacion2, requisito3, observacion3,
    requisito4, observacion4, requisito5, observacion5, requisito6, observacion6,
    requisito7, observacion7, requisito8, observacion8, requisito9, observacion9,
    requisito10, observacion10, requisito11, observacion11, requisito12, observacion12,
    requisito13, observacion13, requisito14, observacion14, requisito15, observacion15,
    requisito16, observacion16, requisito17, observacion17, requisito18, observacion18,
    requisito19, observacion19, requisito20, observacion20, requisito21, observacion21,
    requisito22, observacion22, requisito23, observacion23, requisito24, observacion24,
    requisito25, observacion25, requisito26, observacion26, requisito27, observacion27,
    requisito28, observacion28, requisito29, observacion29, requisito30, observacion30,
    requisito31, observacion31, requisito32, observacion32, requisito33, observacion33,
    requisito34, observacion34, requisito35, observacion35,
    nombre_observacion, fechavisita, horavisita, latitud, longitud`;

  const countSQL = `
    SELECT COUNT(*) AS total FROM (
      SELECT id FROM \`${tablePrincipal}\` ${whereSQL}
      UNION ALL
      SELECT id FROM \`${tableBackup}\` ${whereSQL}
    ) AS combined`;

  const dataSQL = `
    SELECT ${cols}, 'principal' AS _source FROM \`${tablePrincipal}\` ${whereSQL}
    UNION ALL
    SELECT ${cols}, 'backup' AS _source FROM \`${tableBackup}\` ${whereSQL}
    ORDER BY fechavisita DESC, id DESC
    LIMIT :pageSize OFFSET :offset`;

  try {
    const [countResult] = await getPoolArqueo.query<{ total: number }>(countSQL, {
      replacements,
      type: QueryTypes.SELECT,
    });
    const count = (countResult as any).total;

    const ChatArqueo = await getPoolArqueo.query<any>(dataSQL, {
      replacements,
      type: QueryTypes.SELECT,
    });

    const datosConSupervisor = await Promise.all(
      ChatArqueo.map(async (rowData: any) => {
        const usuario = await TBUsuarios.findOne({
          where: { login: rowData.supervisor },
          attributes: ["nombre"],
          raw: true,
        });

        return {
          nombreSupervisor: usuario?.nombre || "SIN NOMBRE REGISTRADO",
          ...rowData,
        };
      })
    );

    res.status(200).json({ count, datos: datosConSupervisor, page, pageSize });
  } catch (error) {
    console.error("Error en getArqueo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getArqueos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { zona, id, source } = req.params; // source: 'principal' | 'backup'

  if (!zona) {
    res.status(400).json("Zona no válida");
    return;
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  const tablePrincipal =
    empresa === "Multired"
      ? "registro_arqueo_multired"
      : "registro_arqueo_servired";
  const tableBackup = `${tablePrincipal}_backup`;

  // La tabla destino se determina por el parámetro de ruta 'source'
  const targetTable = source === "backup" ? tableBackup : tablePrincipal;
  const isBackup = source === "backup";

  // Convierte BLOB (tabla principal) a base64
  const convertToBase64 = (image: any): string | null => {
    if (!image) return null;
    let buffer: Buffer | null = null;
    if (Buffer.isBuffer(image)) {
      buffer = image;
    } else if (typeof image === "object" && image !== null && "data" in image) {
      buffer = Buffer.from((image as { data: number[] }).data);
    }
    if (buffer) {
      const header = buffer.slice(0, 4).toString("hex").toUpperCase();
      if (header.startsWith("89504E47")) return `data:image/png;base64,${buffer.toString("base64")}`;
      if (header.startsWith("FFD8FF"))   return `data:image/jpeg;base64,${buffer.toString("base64")}`;
      const str = buffer.toString("utf-8");
      if (str.startsWith("data:image")) return str;
      if (str.startsWith("iVBOR"))      return `data:image/png;base64,${str}`;
      if (str.startsWith("/9j/"))       return `data:image/jpeg;base64,${str}`;
      return `data:image/jpeg;base64,${buffer.toString("base64")}`;
    }
    if (typeof image === "string") {
      return image.startsWith("data:image") ? image : `data:image/jpeg;base64,${image}`;
    }
    return null;
  };

  const cols = `supervisor, id, ip, nombres, documento, sucursal, puntodeventa,
    ventabruta, baseefectivo, cartera, totalingreso, chancesabonados, chancespreimpresos,
    premiospagados, efectivocajafuerte, tirillarecaudo, totalegresos, totalbilletes,
    totalmonedas, totalarqueo, sobrantefaltante, totalbilletescaja, totalmonedascaja,
    totalpremioscaja, total, rollos_bnet, rollos_fisicos, diferencia,
    nombre_juego, cantidad_bnet, cantidad_fisicos, cantidad_faltante, cantidad_tiquete, descargado,
    nombre_juego2, cantidad_bnet2, cantidad_fisicos2, cantidad_faltante2, cantidad_tiquete2, descargado2,
    nombre_juego3, cantidad_bnet3, cantidad_fisicos3, cantidad_faltante3, cantidad_tiquete3, descargado3,
    nombre_juego4, cantidad_bnet4, cantidad_fisicos4, cantidad_faltante4, cantidad_tiquete4, descargado4,
    nombre_juego5, cantidad_bnet5, cantidad_fisicos5, cantidad_faltante5, cantidad_tiquete5, descargado5,
    nombre_juego6, cantidad_bnet6, cantidad_fisicos6, cantidad_faltante6, cantidad_tiquete6, descargado6,
    nombre_juego7, cantidad_bnet7, cantidad_fisicos7, cantidad_faltante7, cantidad_tiquete7, descargado7,
    totaldescargados, totalvalor,
    requisito1, observacion1, requisito2, observacion2, requisito3, observacion3,
    requisito4, observacion4, requisito5, observacion5, requisito6, observacion6,
    requisito7, observacion7, requisito8, observacion8, requisito9, observacion9,
    requisito10, observacion10, requisito11, observacion11, requisito12, observacion12,
    requisito13, observacion13, requisito14, observacion14, requisito15, observacion15,
    requisito16, observacion16, requisito17, observacion17, requisito18, observacion18,
    requisito19, observacion19, requisito20, observacion20, requisito21, observacion21,
    requisito22, observacion22, requisito23, observacion23, requisito24, observacion24,
    requisito25, observacion25, requisito26, observacion26, requisito27, observacion27,
    requisito28, observacion28, requisito29, observacion29, requisito30, observacion30,
    requisito31, observacion31, requisito32, observacion32, requisito33, observacion33,
    requisito34, observacion34, requisito35, observacion35,
    imagen_observacion, nombre_observacion, firma_auditoria, firma_colocadora,
    fechavisita, horavisita, latitud, longitud`;

  const sql = `SELECT ${cols} FROM \`${targetTable}\` WHERE id = :id ORDER BY fechavisita DESC`;

  try {
    const rows = await getPoolArqueo.query<any>(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });

    const datosConTransformacion = await Promise.all(
      rows.map(async (row: any) => {
        const usuario = await TBUsuarios.findOne({
          where: { login: row.supervisor },
          attributes: ["nombre"],
          raw: true,
        });

        if (isBackup) {
          // Backup: imágenes como TEXT (URLs MinIO)
          return {
            ...row,
            _source: "backup",
            nombreSupervisor: usuario?.nombre || "SIN NOMBRE REGISTRADO",
            imagen_observacion: fixMinIOUrl(row.imagen_observacion),
            firma_auditoria:    fixMinIOUrl(row.firma_auditoria),
            firma_colocadora:   fixMinIOUrl(row.firma_colocadora),
          };
        } else {
          // Principal: imágenes como BLOB
          return {
            ...row,
            _source: "principal",
            nombreSupervisor: usuario?.nombre || "SIN NOMBRE REGISTRADO",
            imagen_observacion: convertToBase64(row.imagen_observacion),
            firma_auditoria:    convertToBase64(row.firma_auditoria),
            firma_colocadora:   convertToBase64(row.firma_colocadora),
          };
        }
      })
    );

    res.status(200).json({ datos: datosConTransformacion });
  } catch (error) {
    console.error("Error en getArqueos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
