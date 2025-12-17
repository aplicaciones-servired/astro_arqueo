import { Workbook } from "exceljs";
import type { Arqueos } from "../../types/arqueo";
import type { Cronograma } from "@/types/cronograma";

interface PropsExport {
    registros: Arqueos[] | Cronograma[];
    nombreArchivo?: string;
    empresa?: string;
}

export const exportarAExcelGlob = async ({
    registros,
    nombreArchivo = "Reporte",
    empresa,
}: PropsExport): Promise<void> => {
    if (!registros || registros.length === 0) return;

    const wb = new Workbook();
    const ws = wb.addWorksheet("Registros");

    // Definir headers para ArqueoInfo
    const headers = ['puntodeventa', 'efectivocajafuerte', 'totalingreso', 'totalarqueo', 'diferencia', 'fechavisita'];

    const headerRow = ws.addRow(headers);

    // Aplicar formato a los encabezados
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Llenar datos
    registros.forEach((registro: any) => {
        const row = headers.map((h) => {
            if (h === 'diferencia') {
                return registro.totalingreso - registro.totalarqueo;
            }

            const v = registro[h];
            if (v === null || v === undefined) return "";

            if (typeof v === "object") {
                try {
                    return JSON.stringify(v);
                } catch {
                    return String(v);
                }
            }
            return v;
        });
        ws.addRow(row);
    });

    // Ajustar automáticamente el ancho de las columnas
    ws.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell?.({ includeEmpty: true }, (cell) => {
            const cellValue = cell.value ? cell.value.toString() : '';
            maxLength = Math.max(maxLength, cellValue.length);
        });
        column.width = Math.min(Math.max(maxLength + 2, 10), 50);
        column.alignment = { horizontal: 'center' };
    });

    try {
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${nombreArchivo.toUpperCase()} POR FECHA ${empresa ? empresa.toUpperCase() : ""
            }.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Error exportando Excel:", err);
    }
};
