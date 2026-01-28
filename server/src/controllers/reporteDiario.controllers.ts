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

  console.log("Parámetros recibidos:", { zona, fechaInicio, fechaFin });

  const empresa = zona === "Multired" ? "Multired" : "Servired";
  initCronograma(empresa);

  const whereClause: any = {
    empresa: empresa,
  };

  if (fechaInicio && fechaFin) {
    // Convertir formato DD/MM/YYYY a YYYY-MM-DD para comparación correcta
    const formatearFecha = (fecha: string): string => {
      // Si la fecha viene en formato YYYY-MM-DD, la dejamos igual
      if (fecha.includes("-")) {
        return fecha;
      }
      // Si viene en formato DD/MM/YYYY, la convertimos
      const partes = fecha.split("/");
      if (partes.length === 3) {
        return `${partes[2]}-${partes[1].padStart(2, "0")}-${partes[0].padStart(2, "0")}`;
      }
      return fecha;
    };

    const fechaInicioFormateada = formatearFecha(fechaInicio);
    const fechaFinFormateada = formatearFecha(fechaFin);

    console.log("Fechas formateadas:", { fechaInicioFormateada, fechaFinFormateada });

    whereClause.dia = {
      [Op.gte]: fechaInicioFormateada,
      [Op.lte]: fechaFinFormateada,
    };
  }

  console.log("Where clause:", JSON.stringify(whereClause, null, 2));

  try {
    const cronogramas = await getProgramacion.findAll({
      attributes: ["dia", "estado", "observacion"],
      where: whereClause,
      order: [["dia", "DESC"]],
    });

    console.log(`Cronogramas encontrados: ${cronogramas.length}`);
    if (cronogramas.length > 0) {
      console.log("Muestra de fechas encontradas:", cronogramas.slice(0, 5).map((c: any) => c.dia));
    }

    // Agrupar por día
    const reportePorDia = cronogramas.reduce((acc: any, item: any) => {
      const dia = item.dia;
      
      if (!acc[dia]) {
        acc[dia] = {
          dia: dia,
          totalCronogramas: 0,
          realizados: 0,
          cerrados: 0,
          pendientes: 0,
          observacion: item.observacion || ""
        };
      }

      acc[dia].totalCronogramas++;
      
      if (item.estado === "Realizado") {
        acc[dia].realizados++;
      } else if (item.estado === "Cerrado") {
        acc[dia].cerrados++;
      } else if (item.estado === "En Espera") {
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
