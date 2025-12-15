import { Request, Response } from "express";
import { initChatBoxModel, Visita } from "../models/visitas.models";
import { TBUsuarios } from "../models/Tbusuario.model";
import { Gamble } from "../models/Gamble.model";
const { Op, fn, col, where: sequelizeWhere } = require("sequelize");

export const getVisita = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 1;
  const offset = (page - 1) * pageSize;
  const zona = req.query.zona as string;
  const fechavisita = req.query.fechavisita as string;
    const fechaInicio = req.query.fechaInicio as string;
  const fechaFin = req.query.fechaFin as string;

  if (zona === undefined) {
    res.status(400).json("Zona no válida");
    return;
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initChatBoxModel(empresa);

  let whereClause: any = {};

  if (fechaInicio && fechaFin) {
    whereClause.fechavisita = {
      [Op.between]: [fechaInicio, fechaFin],
    };
  } else if (fechavisita) {
    whereClause.fechavisita = {
      [Op.eq]: fechavisita,
    };
  }

  try {
    const ChatVisita = await Visita.findAll({
      attributes: [
        "nombres",
        "documento",
        "sucursal",
        "supervisor",
        "fechavisita",
        "horavisita",
      ],
      where: whereClause,
      limit: pageSize,
      offset: offset,
      order: [["fechavisita", "DESC"]],
    });

    const count = await Visita.count({ where: whereClause });

    const datosConSupervisor = await Promise.all(
      ChatVisita.map(async (row: any) => {
        const rowData = row.toJSON();

        // Query TBUsuarios to find the user by login (supervisor field)
        const usuario = await TBUsuarios.findOne({
          where: { login: rowData.supervisor},
          attributes: ["nombre"],
          raw: true,
        });

        const puntodeventa = await Gamble.findOne({
          where: { CODIGO: rowData.sucursal },
          attributes: ["NOMBRE"],
          raw: true,
        });


        return {
          nombreSupervisor: usuario?.nombre || "SIN NOMBRE REGISTRADO",
          nombrePuntoDeVenta: puntodeventa?.NOMBRE || "SIN NOMBRE REGISTRADO",
          ...rowData,
        };
      })
    );

    res.status(200).json({ count, datos: datosConSupervisor, page, pageSize });
  } catch (error) {
    console.error("Error en getVisita:", error);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
