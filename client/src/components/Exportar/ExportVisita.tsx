import { Workbook } from "exceljs";
import { Visitas } from "@/types/visita";

interface PropsExport {
  registros: Visitas[];
  nombreArchivo?: string;
  empresa?: string;
}

export const exportarVisitasAExcel = async ({
  registros,
  nombreArchivo = "Visitas",
  empresa,
}: PropsExport): Promise<void> => {
  if (!registros || registros.length === 0) return;

  const wb = new Workbook();
  const ws = wb.addWorksheet("Visitas");

  // Headers específicos para visitas
  const headers = ['fechavisita', 'nombres', 'documento', 'sucursal', 'horavisita', 'nombrePuntoDeVenta', 'tiempo', 'tiempo_desplazamiento'];

  const headerRow = ws.addRow(headers);

  // Aplicar formato a los encabezados
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  // Ordenar TODAS las visitas por fecha y hora cronológicamente (sin agrupar por persona)
  const todasVisitas = [...registros].sort((a, b) => {
    const fechaA = `${a.fechavisita} ${a.horavisita}`;
    const fechaB = `${b.fechavisita} ${b.horavisita}`;
    return fechaA.localeCompare(fechaB);
  });

  // Agrupar visitas consecutivas del mismo punto Y misma persona
  const grupos: any[][] = [];
  let grupoActual: any[] = [];
  let puntoActual = "";
  let personaActual = "";

  todasVisitas.forEach((visita) => {
    const clave = `${visita.nombrePuntoDeVenta}_${visita.nombres}`;
    const claveActual = `${puntoActual}_${personaActual}`;

    if (clave !== claveActual) {
      // Cambió de punto o persona, iniciar nuevo grupo
      if (grupoActual.length > 0) {
        grupos.push(grupoActual);
      }
      grupoActual = [visita];
      puntoActual = visita.nombrePuntoDeVenta;
      personaActual = visita.nombres;
    } else {
      // Mismo punto y persona, agregar al grupo actual
      grupoActual.push(visita);
    }
  });

  // Agregar el último grupo
  if (grupoActual.length > 0) {
    grupos.push(grupoActual);
  }

  // Procesar cada grupo
  grupos.forEach((visitas, grupoIdx) => {
      const horaEntrada = visitas[0].horavisita;
      const horaSalida = visitas[visitas.length - 1].horavisita;

      // Calcular tiempo en el punto
      let tiempoEnPunto = "00:00:00";
      if (visitas.length > 1) {
        try {
          const [hE, mE, sE] = horaEntrada.split(':').map(Number);
          const [hS, mS, sS] = horaSalida.split(':').map(Number);

          const entrada = hE * 3600 + mE * 60 + sE;
          const salida = hS * 3600 + mS * 60 + sS;
          const diferencia = salida - entrada;

          const horas = Math.floor(diferencia / 3600);
          const minutos = Math.floor((diferencia % 3600) / 60);
          const segundos = diferencia % 60;

          tiempoEnPunto = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
        } catch (e) {
        }
      }

      // Calcular tiempo de desplazamiento desde el grupo anterior
      let tiempoDesplazamiento = "";
      if (grupoIdx > 0) {
        try {
          const grupoAnterior = grupos[grupoIdx - 1];
          const horaSalidaAnterior = grupoAnterior[grupoAnterior.length - 1].horavisita;

          const [hS, mS, sS] = horaSalidaAnterior.split(':').map(Number);
          const [hE, mE, sE] = horaEntrada.split(':').map(Number);

          const salidaAnterior = hS * 3600 + mS * 60 + sS;
          const llegadaActual = hE * 3600 + mE * 60 + sE;
          const diferencia = llegadaActual - salidaAnterior;

          if (diferencia > 0) {
            const horas = Math.floor(diferencia / 3600);
            const minutos = Math.floor((diferencia % 3600) / 60);
            const segundos = diferencia % 60;

            tiempoDesplazamiento = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
          }
        } catch (e) {
          // Error calculando tiempo desplazamiento
        }
      }

      // Escribir filas para este grupo
      visitas.forEach((registro, index) => {
        const row = headers.map((h) => {
          if (h === 'tiempo') {
            // Primera fila (llegada): mostrar tiempo en punto
            if (index === 0) {
              return tiempoEnPunto;
            }
            // Última fila (salida): mostrar desplazamiento
            if (index === visitas.length - 1 && tiempoDesplazamiento) {
              return tiempoDesplazamiento;
            }
            // Filas intermedias: vacío
            return "";
          }
          if (h === 'tiempo_desplazamiento') {
            return "";
          }

          const v = (registro as any)[h];
          if (v === null || v === undefined) return "";

          if (h === 'fechavisita' && v) {
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

        // Aplicar borde a la última fila del grupo
        if (index === visitas.length - 1) {
          rowCell.eachCell((cell) => {
            cell.border = {
              bottom: { style: 'medium', color: { argb: '000000' } }
            };
          });
        }
      });
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
    a.download = `${nombreArchivo.toUpperCase()} POR FECHA ${empresa ? empresa.toUpperCase() : ""}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error exportando Excel:", err);
  }
};
