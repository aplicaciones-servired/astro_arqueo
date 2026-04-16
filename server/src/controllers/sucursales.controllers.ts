import { Op } from "sequelize";
import { Gamble } from "../models/Gamble.model";
import { Request, Response } from "express";
import { notifyBackendError } from "../utils/errorMail";

export const GetSucursales = async (
  req: Request,
  res: Response
): Promise<void> => {
  const zona = req.params.zona;
  const tipo = req.params.tipo as string;

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
  } else if (tipo) {
    whereClause.TIPO = {
      [Op.eq]: tipo,
    };
  }

  try {
    const datos = await Gamble.findAll({
      where: whereClause,
    });

    res.status(200).json({ message: "informacion obtenida", datos });
  } catch (error) {
    await notifyBackendError({ controller: "GetSucursales", req, error });
    res.status(500).json({ message: "Error al obtener las sucursales", error });
  }
};
