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

  console.log("data", puntodeventa);
  console.log("data", zona);
  console.log("data", nota);
  console.log("data", dia);

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
  const { zona } = req.params; // la zona sí está en params
  const { page = "1", limit = "10" } = req.query; // page y limit vienen de query

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCronograma(empresa);

  try {
    const offset =
      (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
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
      offset,
      limit: parseInt(limit as string, 10),
      order: [["dia", "DESC"]],
    });
    res.status(200).json(getprogramacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetProgramacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.params;
  const { zona, id } = data; // la zona sí está en params
  

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
      where: {
        id: id,
      },
      order: [["dia", "DESC"]],
    });
    res.status(200).json(getprogramacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
