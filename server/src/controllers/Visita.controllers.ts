import { Request, Response } from "express";
import { initChatBoxModel, Visita } from "../models/visitas.models";
import { TBUsuarios } from "../models/Tbusuario.model";
const { Op, fn, col, where: sequelizeWhere } = require("sequelize");

export const getVisita = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 1;
  const offset = (page - 1) * pageSize;
  const zona = req.query.zona as string;
  const fechavisita = req.query.fechavisita as string;
  if (zona === undefined) {
    res.status(400).json("Zona no válida");
    return;
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initChatBoxModel(empresa);

  let whereClause: any = {};

  if (fechavisita) {
    // Comparación por solo la fecha, sin horas ⬇⬇
    whereClause[Op.and] = [
      sequelizeWhere(fn("DATE", col("fechavisita")), "=", fechavisita),
    ];
  }

  try {
    const { count, rows } = await Visita.findAndCountAll({
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

    const datosConSupervisor = await Promise.all(
      rows.map(async (row: any) => {
        const rowData = row.toJSON();

        // Query TBUsuarios to find the user by login (supervisor field)
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};
