import ExcelJS from "exceljs";
import { Cronograma } from "@/types/cronograma";
import { saveAs } from "file-saver";

// ======================
// HELPERS
// ======================
function aplicarBordes(row: ExcelJS.Row) {
    row.eachCell((cell) => {
        cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
        };
    });
}

function headerStyle(row: ExcelJS.Row) {
    row.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: "center" };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "D9E1F2" },
        };
        aplicarBordes(row);
    });
}

const porcentaje = (valor: number, total: number) =>
    total === 0 ? 0 : Math.round((valor / total) * 100);

// ======================
// MAIN
// ======================
export async function exportarInformeExcel(filteredPDV: Cronograma[]) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Informe");
    // Ajustar el ancho de columnas para la tabla resumen
    sheet.columns = [
        { width: 18 }, // Programados
        { width: 18 }, // No Ejecutados
        { width: 18 }, // Ejecutados
        { width: 18 }, // Arqueo de Retiro
        { width: 18 }, // Cerrados
        { width: 22 }, // No Se Pudo Realizar
        { width: 16 }, // % Programados
        { width: 16 }, // % No Ejecutados
        { width: 16 }, // % Ejecutados
        { width: 16 }, // % Por Retiro
        { width: 16 }, // % Cerrados
        { width: 16 }, // % No Realizado
    ];

    // ======================
    // TITULO
    // ======================
    sheet.mergeCells("A1:L1");
    sheet.getCell("A1").value = "Informe de Puntos de Venta";
    sheet.getCell("A1").font = { bold: true, size: 16 };
    sheet.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
    sheet.getRow(1).height = 28;

    sheet.addRow([]);

    // ======================
    // DATOS (DINÁMICOS)
    // ======================
    const totalProgramados = filteredPDV.length;
    const totalNoEjecutados = filteredPDV.filter(pdv => pdv.estado === "En Espera" || pdv.estado === "Sin Ejecutar").length;
    const totalEjecutados = filteredPDV.filter(pdv => pdv.estado === "Realizado" || pdv.estado === "Ejecutado").length;
    const totalRetiro = filteredPDV.filter(pdv => pdv.nota === "ARQUEO DE RETIRO").length;
    const totalCerrados = filteredPDV.filter(pdv => pdv.estado === "Cerrado").length;
    const totalNoRealizado = filteredPDV.filter(pdv => pdv.estado === "No Se Pudo Realizar").length;

    // ======================
    // TABLA RESUMEN
    // ======================
    const porcentajes = [
        totalProgramados,
        totalNoEjecutados,
        totalEjecutados,
        totalRetiro,
        totalCerrados,
        totalNoRealizado,
    ].map((valor) =>
        totalProgramados > 0 ? ((valor / totalProgramados) * 100).toFixed(2) : "0.00"
    );

    const headerResumen = sheet.addRow([
        "Programados",
        "No Ejecutados",
        "Ejecutados",
        "Arqueo de Retiro",
        "Cerrados",
        "No Se Pudo Realizar",
        "% Programados",
        "% No Ejecutados",
        "% Ejecutados",
        "% Por Retiro",
        "% Cerrados",
        "% No Realizado",
    ]);
    headerStyle(headerResumen);
    // Color de fondo extra para encabezado
    headerResumen.eachCell((cell) => {
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "B4C6E7" },
        };
    });

    const rowResumen = sheet.addRow([
        totalProgramados,
        totalNoEjecutados,
        totalEjecutados,
        totalRetiro,
        totalCerrados,
        totalNoRealizado,
        `${porcentajes[0]}%`,
        `${porcentajes[1]}%`,
        `${porcentajes[2]}%`,
        `${porcentajes[3]}%`,
        `${porcentajes[4]}%`,
        `${porcentajes[5]}%`,
    ]);

    aplicarBordes(rowResumen);

    sheet.addRow([]);

    // ======================
    // TABLA PUNTOS CERRADOS
    // ======================
    sheet.addRow(["Puntos Cerrados"]);
    sheet.getRow(sheet.rowCount).font = { bold: true };

    const headerCerrados = sheet.addRow([
        "Punto de Venta",
        "Estado",
        "Fecha",
        "Cantidad",
    ]);
    headerStyle(headerCerrados);
    headerCerrados.eachCell((cell) => {
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FCE4D6" },
        };
    });

    // Agrupar puntos cerrados por punto de venta
    const resumenPuntos = filteredPDV.reduce((acc, pdv) => {
        if (pdv.estado === "Cerrado") {
            const punto = pdv.puntodeventa;
            if (!acc[punto]) {
                acc[punto] = {
                    cantidad: 0,
                    fecha: pdv.dia,
                    estado: pdv.estado,
                };
            }
            acc[punto].cantidad += 1;
        }
        return acc;
    }, {} as Record<string, { cantidad: number; fecha: string; estado: string }>);

    const listaUnica = Object.entries(resumenPuntos);

    listaUnica.forEach(([punto, info]) => {
        const r = sheet.addRow([
            punto,
            info.estado,
            info.fecha,
            info.cantidad,
        ]);
        aplicarBordes(r);
    });

    const totalCerradosRow = sheet.addRow([
        "Total Puntos Cerrados",
        "",
        "",
        listaUnica.length,
    ]);

    totalCerradosRow.font = { bold: true };
    aplicarBordes(totalCerradosRow);

    // ======================
    // GUARDAR
    // ======================
    // Generar el archivo como Blob y descargarlo en el navegador
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "Informe_Puntos_Venta.xlsx");
}
