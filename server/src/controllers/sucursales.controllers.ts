import { Op } from "sequelize";
import { Gamble } from "../models/Gamble.model";
import { Request, Response } from "express";

export const GetSucursales = async (
  req: Request,
  res: Response
): Promise<void> => {
  const zona = req.params.zona;

  if (zona === undefined) {
    res.status(400).json("Zona no válida");
    return;
  }

  const ZONA = zona === "Multired" ? "39627" : "39628";

  let whereClause: any = {};

  if (ZONA) {
    whereClause.ZONA = {
      [Op.like]: `%${ZONA}%`,
    };
    whereClause.ESTADO = {
      [Op.like]: "A",
    };
  }

  try {
    const datos = await Gamble.findAll({
      where: whereClause,
    });

    res.status(200).json({ message: "informacion obtenida", datos });
  } catch (error) {
    console.error("Error al obtener arqueo manual:", error);
    res
      .status(500)
      .json({ message: "Error al obtener el arqueo manual", error });
  }
};
