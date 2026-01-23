import { Workbook } from "exceljs";
import type { ReporteDiario } from "@/types/reporteDiario";

interface PropsExportReporte {
  registros: ReporteDiario[];
  nombreArchivo?: string;
  empresa?: string;
}

export const exportarReporteDiarioExcel = async ({
  registros,
  nombreArchivo = "ReporteDiario",
  empresa,
}: PropsExportReporte): Promise<void> => {
  if (!registros || registros.length === 0) {
    throw new Error("No hay registros para exportar");
  }

  const wb = new Workbook();
  const ws = wb.addWorksheet("Reporte Diario");

  // Definir encabezados personalizados
  const headers = [
    "Fecha",
    "Total Cronogramas",
    "Realizados",
    "Pendientes",
    "% Completado",
    "Observación"
  ];

  // Agregar fila de encabezados
  const headerRow = ws.addRow(headers);

  // Aplicar formato a los encabezados
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4472C4" }
  };
  headerRow.alignment = { vertical: "middle", horizontal: "center" };
  headerRow.height = 25;

  // Agregar datos
  registros.forEach((registro) => {
    const porcentaje = registro.totalCronogramas > 0
      ? ((registro.realizados / registro.totalCronogramas) * 100).toFixed(1)
      : "0.0";

    const fecha = new Date(registro.dia);
    const fechaFormateada = fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const row = ws.addRow([
      fechaFormateada,
      registro.totalCronogramas,
      registro.realizados,
      registro.pendientes,
      `${porcentaje}%`,
      registro.observacion || "Sin observaciones"
    ]);

    // Colorear según el porcentaje de completado
    const porcentajeNum = parseFloat(porcentaje);
    const colorCelda = porcentajeNum >= 80 ? "FFC6EFCE" : // Verde claro
      porcentajeNum >= 50 ? "FFFFF2CC" : // Amarillo claro
        "FFFFC7CE"; // Rojo claro

    row.getCell(5).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: colorCelda }
    };

    row.getCell(5).font = {
      bold: true,
      color: {
        argb: porcentajeNum >= 80 ? "FF006100" : // Verde oscuro
          porcentajeNum >= 50 ? "FF9C6500" : // Amarillo oscuro
            "FF9C0006" // Rojo oscuro
      }
    };

    // Alinear celdas
    row.alignment = { vertical: "middle", horizontal: "center" };
    row.height = 20;
  });

  // Agregar fila de totales
  const totalCronogramas = registros.reduce((sum, r) => sum + r.totalCronogramas, 0);
  const totalRealizados = registros.reduce((sum, r) => sum + r.realizados, 0);
  const totalPendientes = registros.reduce((sum, r) => sum + r.pendientes, 0);
  const porcentajeTotal = totalCronogramas > 0
    ? ((totalRealizados / totalCronogramas) * 100).toFixed(1)
    : "0.0";

  ws.addRow([]); // Fila vacía
  const totalRow = ws.addRow([
    "TOTALES",
    totalCronogramas,
    totalRealizados,
    totalPendientes,
    `${porcentajeTotal}%`,
    ""
  ]);

  totalRow.font = { bold: true, size: 12 };
  totalRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFD9D9D9" }
  };
  totalRow.alignment = { vertical: "middle", horizontal: "center" };
  totalRow.height = 25;

  // Ajustar ancho de columnas
  ws.getColumn(1).width = 35; // Fecha
  ws.getColumn(2).width = 18; // Total Cronogramas
  ws.getColumn(3).width = 15; // Realizados
  ws.getColumn(4).width = 15; // Pendientes
  ws.getColumn(5).width = 15; // % Completado
  ws.getColumn(6).width = 50; // Observación

  // Aplicar bordes a todas las celdas
  ws.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
    });
  });

  // Generar y descargar el archivo
  try {
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    
    const fechaActual = new Date().toLocaleDateString("es-ES").replace(/\//g, "-");
    a.download = `${nombreArchivo}_${empresa ? empresa.toUpperCase() : ""}_${fechaActual}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error exportando Excel:", err);
    throw new Error("Error al generar el archivo Excel");
  }
};
