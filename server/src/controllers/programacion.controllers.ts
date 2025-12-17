import { Op } from "sequelize";
import {
  initCronograma,
  initCRONOGRAMA,
  Programacion,
  getProgramacion,
} from "../models/programacion.model";
import { Request, Response } from "express";

export const PostProgramacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  const zona = data.empresa;
  const puntodeventa = data.puntovdt;
  const dia = data.fecha;
  const nota = data.nota;

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCRONOGRAMA(empresa);

  try {
    const programacion = await Programacion.create({
      puntodeventa: puntodeventa,
      dia: dia,
      empresa: zona,
      nota: nota,
    });
    res.status(200).json({ message: "Programacion creada", programacion });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la programacion", error });
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

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCronograma(empresa);

  let whereClause: any = {};

  if (fechaInicio && fechaFin) {
    whereClause.dia = {
      [Op.between]: [fechaInicio, fechaFin],
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

export const GetProgramacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.params;
  const { zona, id } = data;

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
      ],
      where: { id: id },
      order: [["dia", "DESC"]],
    });

    const originalString = getprogramacion.map((item: any) => {
      let imagePath: any = item.imagen;

      // Si viene como objeto tipo { type: 'Buffer', data: [...] }
      if (imagePath && typeof imagePath === "object" && "data" in imagePath) {
        imagePath = Buffer.from(
          (imagePath as { data: number[] }).data
        ).toString("base64");
      }

      const base64Image = imagePath
        ? `data:image/jpeg;base64,${imagePath}`
        : null;

      return {
        ...item.toJSON(),
        imagen: base64Image,
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
