import { Workbook } from "exceljs";
import type { Arqueos } from "../../types/arqueo";
import type { Cronograma } from "@/types/cronograma";
import { ArqueoManual } from "@/types/arqueomanual";
import { getPreguntaArqueo } from "@/utils/constans";

interface PropsExport {
  registros: Arqueos[] | Cronograma[] | ArqueoManual[];
  nombreArchivo?: string;
  empresa?: string;
}

type Columna = {
  key: string;
  header: string;
  esPregunta: boolean;
};

const REQUISITO_KEY = /^requisito(\d+)$/;
const OBSERVACION_KEY = /^observacion(\d+)$/;

const tieneValor = (valor: unknown): boolean =>
  valor !== null && valor !== undefined && String(valor).trim() !== "";

export const exportarAExcel = async ({
  registros,
  nombreArchivo = "Reporte",
  empresa,
}: PropsExport): Promise<void> => {
  if (!registros || registros.length === 0) return;

  const wb = new Workbook();
  const ws = wb.addWorksheet("Registros");

  const allKeys = Object.keys(registros[0] as any);

  // Números de requisito que realmente tienen respuesta en algún registro
  const numerosConRespuesta = new Set<number>();
  for (const registro of registros) {
    for (const key of Object.keys(registro as any)) {
      const match = REQUISITO_KEY.exec(key);
      if (match && tieneValor((registro as any)[key])) {
        numerosConRespuesta.add(Number(match[1]));
      }
    }
  }

  // Las columnas requisitoN / observacionN se muestran con la pregunta completa
  // y se omiten las que nunca fueron respondidas.
  const columnas: Columna[] = allKeys
    .filter((key) => key !== "id" && key !== "_id" && key !== "ip" && key !== "url_imagen")
    .flatMap((key): Columna[] => {
      const requisito = REQUISITO_KEY.exec(key);
      if (requisito) {
        const n = Number(requisito[1]);
        return numerosConRespuesta.has(n)
          ? [{ key, header: `${n}. ${getPreguntaArqueo(n)}`, esPregunta: true }]
          : [];
      }

      const observacion = OBSERVACION_KEY.exec(key);
      if (observacion) {
        const n = Number(observacion[1]);
        return numerosConRespuesta.has(n)
          ? [{ key, header: `${n}. ${getPreguntaArqueo(n)} (Observación)`, esPregunta: true }]
          : [];
      }

      return [{ key, header: key, esPregunta: false }];
    });

  if (columnas.length === 0) return;

  const headerRow = ws.addRow(columnas.map((c) => c.header));

  // Aplicar formato a los encabezados
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

  // Con muchas columnas de preguntas conviene dejar la cabecera fija
  ws.views = [{ state: 'frozen', ySplit: 1 }];

  registros.forEach((registro) => {
    const row = columnas.map(({ key }) => {
      const v = (registro as any)[key];
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
  columnas.forEach(({ esPregunta }, index) => {
    const column = ws.getColumn(index + 1);
    if (esPregunta) {
      column.width = 28;
      column.alignment = { vertical: 'middle', wrapText: true };
      return;
    }

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
