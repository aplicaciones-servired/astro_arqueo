import { Op } from "sequelize";
import {
  ArqueoManualModel,
  initArqueoManualModel,
} from "../models/arqueo.manual";
import { Request, Response } from "express";
import { uploadToMinIO } from "../utils/uploadMinIO";

export const PostArqueoManual = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { zona } = req.params;
  const { puntodeventa, nombre, documento, base, ventabruta, totalingreso, efectivocajafuerte, sobrantefaltante, valor } = req.body;

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initArqueoManualModel(empresa);

  try {
    let url_imagen: string | undefined = undefined;

    // Si hay un archivo adjunto, subirlo a MinIO
    if (req.file) {
      url_imagen = await uploadToMinIO(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
    }

    const programacion = await ArqueoManualModel.create({
      puntodeventa: puntodeventa,
      nombre: nombre,
      documento: documento,
      base: base,
      ventabruta: ventabruta,
      totalingreso: totalingreso,
      efectivocajafuerte: efectivocajafuerte,
      sobrantefaltante: sobrantefaltante,
      valor: valor,
      url_imagen: url_imagen,
      fecha: new Date(),
    });
    res.status(200).json({ message: "Arqueo manual creado", programacion });
  } catch (error) {
    console.error("Error al crear arqueo manual:", error);
    res.status(500).json({ message: "Error al crear el arqueo manual", error });
  }
};

export const GetArqueoManual = async (
  req: Request,
  res: Response
): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;
  const zona = req.query.zona as string;
  const fecha = req.query.fecha as string;
  const puntodeventa = req.query.puntodeventa as string;
  const fechaInicio = req.query.fechaInicio as string;
  const fechaFin = req.query.fechaFin as string;

  if (zona === undefined) {
    res.status(400).json("Zona no válida");
    return;
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initArqueoManualModel(empresa);

  let whereClause: any = {};

  if (fechaInicio && fechaFin) {
    whereClause.fecha = {
      [Op.between]: [fechaInicio, fechaFin],
    };
  } else if (fecha) {
    whereClause.fecha = {
      [Op.eq]: fecha,
    };
  }
  if (puntodeventa) {
    whereClause.puntodeventa = {
      [Op.like]: `%${puntodeventa}%`,
    };
  }

  try {
    const datos = await ArqueoManualModel.findAll({
      where: whereClause,
      offset: offset,
      limit: pageSize,
    });
    const count = await ArqueoManualModel.count({ where: whereClause });
    res.status(200).json({ message: "informacion obtenida", datos, count, page, pageSize });
  } catch (error) {
    console.error("Error al obtener arqueo manual:", error);
    res.status(500).json({ message: "Error al obtener el arqueo manual", error });
  }
};
