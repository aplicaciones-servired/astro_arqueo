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
  let esVisita = false;

  if (registros.length > 0) {
    const firstRecord = registros[0] as any;

    // Detectar tipo de registro basado en campos presentes
    if ('horavisita' in firstRecord && 'nombrePuntoDeVenta' in firstRecord) {
      // Es una Visita
      esVisita = true;
      headers = ['fechavisita', 'nombres', 'documento', 'sucursal', 'nombrePuntoDeVenta', 'tiempo', 'horavisita', 'nombreSupervisor', 'supervisor'];
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

  // Si es visita, agrupar por persona, punto de venta y fecha para calcular tiempos
  if (esVisita) {
    const visitasAgrupadas = new Map<string, any[]>();

    registros.forEach((registro: any) => {
      const key = `${registro.nombres}_${registro.nombrePuntoDeVenta}_${new Date(registro.fechavisita).toDateString()}`;
      if (!visitasAgrupadas.has(key)) {
        visitasAgrupadas.set(key, []);
      }
      visitasAgrupadas.get(key)!.push(registro);
    });

    visitasAgrupadas.forEach((visitas) => {
      // Ordenar por hora
      visitas.sort((a, b) => a.horavisita.localeCompare(b.horavisita));

      const horaEntrada = visitas[0].horavisita;
      const horaSalida = visitas[visitas.length - 1].horavisita;

      // Calcular diferencia de tiempo
      let tiempoTotal = "";
      if (visitas.length > 1) {
        const [hE, mE, sE] = horaEntrada.split(':').map(Number);
        const [hS, mS, sS] = horaSalida.split(':').map(Number);

        const entrada = hE * 3600 + mE * 60 + sE;
        const salida = hS * 3600 + mS * 60 + sS;
        const diferencia = salida - entrada;

        const horas = Math.floor(diferencia / 3600);
        const minutos = Math.floor((diferencia % 3600) / 60);
        const segundos = diferencia % 60;

        tiempoTotal = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
      }

      // Mostrar los dos registros (entrada y salida) con el tiempo calculado
      visitas.forEach((registro, index) => {
        const row = headers.map((h) => {
          if (h === 'tiempo') return tiempoTotal;

          const v = (registro as any)[h];
          if (v === null || v === undefined) return "";

          if (h === 'fechavisita' && v) {
            // Extraer el día directamente del string "YYYY-MM-DD" sin convertir a Date
            const dia = v.split('T')[0].split('-')[2];
            return parseInt(dia, 10);
          }

          if (typeof v === "object") {
            try {
              return JSON.stringify(v);
            } catch {
              return String(v);
            }
          }
          return v;
        });

        const rowCell = ws.addRow(row);

        // Aplicar negrilla a la última fila del grupo (salida) para separarlas
        if (index === visitas.length - 1) {
          rowCell.eachCell((cell) => {
            cell.border = {
              bottom: { style: 'medium', color: { argb: '000000' } }
            };
          });
        }
      });
    });
  } else {
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
  }

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
