import { Workbook } from "exceljs";
import type { Cronograma } from "@/types/cronograma";
import type { Sucursal } from "@/types/sucursales";

interface PropsExportCalendario {
  registros: Cronograma[];
  sucursales: Sucursal[];
  nombreArchivo?: string;
  mes: number; // 1-12
  año: number;
}

export const exportarCronogramaCalendario = async ({
  registros,
  sucursales,
  nombreArchivo = "Cronograma_Calendario",
  mes,
  año,
}: PropsExportCalendario): Promise<void> => {
  if (!registros || registros.length === 0) return;
  const wb = new Workbook();
  const ws = wb.addWorksheet("Cronograma");

  // Obtener todos los días del mes
  const diasEnMes = new Date(año, mes, 0).getDate();
  const diasSemana = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  // Crear array de días con día de la semana
  const dias = Array.from({ length: diasEnMes }, (_, i) => {
    const fecha = new Date(año, mes - 1, i + 1);
    const diaSemana = diasSemana[fecha.getDay()];
    return {
      numero: i + 1,
      diaSemana
    };
  });

  // Filtrar registros por mes y año usando el string de fecha directamente
  const registrosFiltrados = registros.filter(r => {
    // Extraer año y mes del string de fecha (YYYY-MM-DD)
    const fechaStr = r.dia.split('T')[0]; // "2025-12-01"
    const [añoStr, mesStr] = fechaStr.split('-');
    const añoRegistro = parseInt(añoStr);
    const mesRegistro = parseInt(mesStr);

    return mesRegistro === mes && añoRegistro === año;
  });

 
  
  // Crear encabezados
  const headerRow1 = ws.addRow(['PUNTO DE VENTA / CODIGO', 'ARQUEOS PROGRAMADOS', ...dias.map(d => d.diaSemana)]);
  const headerRow2 = ws.addRow(['', '', ...dias.map(d => d.numero)]);

  // Estilo de encabezados
  headerRow1.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow1.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' }
  };
  headerRow1.alignment = { vertical: 'middle', horizontal: 'center' };

  headerRow2.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow2.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' }
  };
  headerRow2.alignment = { vertical: 'middle', horizontal: 'center' };

  // Ajustar anchos de columnas
  ws.getColumn(1).width = 35; // Punto de venta
  ws.getColumn(2).width = 20; // Arqueos programados
  for (let i = 3; i <= diasEnMes + 2; i++) {
    ws.getColumn(i).width = 5;
  }

  // Agregar filas para cada punto de venta
  sucursales.forEach(punto => {
    const cronogramasPunto = registrosFiltrados.filter(r =>
      r.puntodeventa?.toUpperCase().trim() === punto.NOMBRE?.toUpperCase().trim()
    );

    // Contar días programados
    const diasProgramados = cronogramasPunto.length;

    // Crear array de valores para los días con información de estado
    const valoresDias = dias.map(dia => {
      const fechaBuscada = `${año}-${String(mes).padStart(2, '0')}-${String(dia.numero).padStart(2, '0')}`;

      const cronogramaDelDia = cronogramasPunto.find(c => {
        const fechaCrono = c.dia.split('T')[0];
        return fechaCrono === fechaBuscada;
      });

      if (cronogramaDelDia) {
        // Retornar objeto con valor y estado
        return {
          valor: '1',
          estado: cronogramaDelDia.estado
        };
      }

      return { valor: '', estado: null };
    });

    const row = ws.addRow([punto.NOMBRE, diasProgramados, ...valoresDias.map(v => v.valor)]);

    // Aplicar estilo a la fila
    row.alignment = { vertical: 'middle', horizontal: 'center' };
    row.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    // Colorear celdas con cronogramas según su estado
    valoresDias.forEach((diaData, index) => {
      if (diaData.valor === '1') {
        const cell = row.getCell(index + 3); // +3 porque las primeras dos columnas son punto y total

        // Determinar color según el estado (convertir a minúsculas para comparar)
        const estadoLower = diaData.estado?.toLowerCase() || '';
        const esCerrado = estadoLower.includes('cerrado') || estadoLower.includes('cerrada');
        const esRealizado = estadoLower.includes('Realizado'.toLowerCase());
        const esNoSeRealizo = estadoLower.includes('no se pudo realizar');

        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: esCerrado ? 'FFFF0000' : esRealizado ? 'FF00FF00' : esNoSeRealizo ? 'FF808080' : 'FF87CEEB' } // Rojo si está cerrado, verde si realizado, gris si no se pudo realizar, azul claro si está en espera
        };
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      }
    });
  });

  // Agregar bordes a los encabezados
  headerRow1.eachCell(cell => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

  headerRow2.eachCell(cell => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

  // Agregar leyenda de colores al final
  ws.addRow([]); // Fila vacía
  const leyendaTitulo = ws.addRow(['LEYENDA DE ESTADOS:']);
  leyendaTitulo.font = { bold: true, size: 12 };

  // Fila con azul claro - En Espera
  const rowEspera = ws.addRow(['En Espera / Pendiente', '']);
  rowEspera.getCell(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF87CEEB' }
  };
  rowEspera.getCell(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  rowEspera.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

  // Fila con verde - Realizado
  const rowRealizado = ws.addRow(['Realizado', '']);
  rowRealizado.getCell(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF00FF00' }
  };
  rowRealizado.getCell(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  rowRealizado.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

  // Fila con rojo - Cerrado
  const rowCerrado = ws.addRow(['Cerrado', '']);
  rowCerrado.getCell(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFF0000' }
  };
  rowCerrado.getCell(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  rowCerrado.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

   // Fila con gris - No Se Pudo Realizar
  const rowNoSeRealizo = ws.addRow(['No Se Pudo Realizar', '']);
  rowNoSeRealizo.getCell(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF808080' }
  };
  rowNoSeRealizo.getCell(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  rowNoSeRealizo.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

  // Generar archivo
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${nombreArchivo}_${año}_${mes}.xlsx`;
  anchor.click();

  window.URL.revokeObjectURL(url);
};
