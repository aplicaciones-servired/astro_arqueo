import { Workbook } from "exceljs";
import type { Arqueos } from "../../types/arqueo";
import type { Cronograma } from "@/types/cronograma";
import { Visitas } from "@/types/visita";

interface PropsExport {
  registros: Arqueos[] | Cronograma[] | Visitas[];
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
    
    // Detectar tipo de registro basado en campos presentes
    if ('horavisita' in firstRecord && 'nombrePuntoDeVenta' in firstRecord) {
      // Es una Visita
      headers = ['nombres', 'documento', 'sucursal', 'horavisita', 'nombrePuntoDeVenta', 'fechavisita', 'nombreSupervisor', 'supervisor'];
    } else if ('dia' in firstRecord) {
      // Es un Cronograma
      const allKeys = Object.keys(firstRecord);
      headers = allKeys.filter(key => key !== "id" && key !== "_id" && key !== "ip");
    } else {
      // Es un Arqueo u otro tipo
      const allKeys = Object.keys(firstRecord);
      headers = allKeys.filter(key => key !== "id" && key !== "_id" && key !== "ip");
    }
  }

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
  } catch (err) {
    console.error("Error exportando Excel:", err);
  }
};
