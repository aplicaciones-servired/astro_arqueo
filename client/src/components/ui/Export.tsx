import { Workbook } from "exceljs";
import type { Arqueos } from "../../types/arqueo";
import type { Cronograma } from "@/types/cronograma";

interface PropsExport {
  registros: Arqueos[] | Cronograma[];
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

  const headersSet = new Set<string>();
  registros.forEach((r) =>
    Object.keys(r as any).forEach((k) => headersSet.add(k))
  );
  const headers = Array.from(headersSet);
  ws.addRow(headers);

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

  try {
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nombreArchivo.toUpperCase()} POR FECHA ${
      empresa ? empresa.toUpperCase() : ""
    }.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {}
};
