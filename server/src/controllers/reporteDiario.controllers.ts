import { Request, Response } from "express";
import { Op } from "sequelize";
import { initCronograma, getProgramacion } from "../models/programacion.model";

export const GetReporteDiario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const zona = req.query.zona as string;
  const fechaInicio = req.query.fechaInicio as string;
  const fechaFin = req.query.fechaFin as string;

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCronograma(empresa);

  const whereClause: any = {
    empresa: empresa,
  };

  if (fechaInicio && fechaFin) {
    whereClause.dia = {
      [Op.between]: [fechaInicio, fechaFin],
    };
  }

  try {
    const cronogramas = await getProgramacion.findAll({
      attributes: ["dia", "estado", "observacion"],
      where: whereClause,
      order: [["dia", "DESC"]],
    });

    // Agrupar por día
    const reportePorDia = cronogramas.reduce((acc: any, item: any) => {
      const dia = item.dia;
      
      if (!acc[dia]) {
        acc[dia] = {
          dia: dia,
          totalCronogramas: 0,
          realizados: 0,
          pendientes: 0,
          observacion: item.observacion || ""
        };
      }

      acc[dia].totalCronogramas++;
      
      if (item.estado === "Realizado") {
        acc[dia].realizados++;
      } else {
        acc[dia].pendientes++;
      }

      // Si hay una observación más reciente, la mantenemos
      if (item.observacion) {
        acc[dia].observacion = item.observacion;
      }

      return acc;
    }, {});

    // Convertir el objeto a array
    const resultado = Object.values(reportePorDia);

    res.status(200).json({ 
      count: resultado.length, 
      datos: resultado 
    });
  } catch (error) {
    console.error("Error en GetReporteDiario:", error);
    res.status(500).json({ 
      message: "Error al obtener el reporte diario", 
      error 
    });
  }
};

export const UpdateObservacionDiaria = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { dia, observacion, zona } = req.body;

  if (!dia || !zona) {
    res.status(400).json({ message: "Faltan parámetros requeridos" });
    return;
  }

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCronograma(empresa);

  try {
    // Actualizar la observación para todos los cronogramas de ese día
    await getProgramacion.update(
      { observacion: observacion || "" },
      {
        where: {
          dia: dia,
          empresa: empresa,
        },
      }
    );

    res.status(200).json({ 
      message: "Observación actualizada exitosamente",
      dia: dia,
      observacion: observacion
    });
  } catch (error) {
    console.error("Error al actualizar observación:", error);
    res.status(500).json({ 
      message: "Error al actualizar la observación", 
      error 
    });
  }
};
