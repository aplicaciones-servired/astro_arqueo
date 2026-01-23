import { Workbook } from "exceljs";
import type { Arqueos } from "../../types/arqueo";
import type { Cronograma } from "@/types/cronograma";
import { ArqueoManual } from "@/types/arqueomanual";

interface PropsExport {
  registros: Arqueos[] | Cronograma[] | ArqueoManual[];
  nombreArchivo?: string;
  empresa?: string;
}

export const exportarAExcel = async ({
  registros,
  nombreArchivo = "Reporte",
  empresa,
}: PropsExport): Promise<void> => {
  if (!registros || registros.length === 0) return;

  const wb = new Workbook();
  const ws = wb.addWorksheet("Registros");

  // Definir orden específico según el tipo de registro
  let headers: string[] = [];

  if (registros.length > 0) {
    const firstRecord = registros[0] as any;
    const allKeys = Object.keys(firstRecord);
    headers = allKeys.filter(key => key !== "id" && key !== "_id" && key !== "ip" && key !== "url_imagen");
  }

  const headerRow = ws.addRow(headers);

  // Aplicar formato a los encabezados
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  registros.forEach((registro) => {
    const row = headers.map((h) => {
      const v = (registro as any)[h];
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
