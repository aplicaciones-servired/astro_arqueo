import { Workbook } from "exceljs";
import type { Cronograma } from "@/types/cronograma";

interface PropsExportCalendario {
  registros: Cronograma[];
  nombreArchivo?: string;
  mes: number; // 1-12
  año: number;
}

export const exportarCronogramaCalendario = async ({
  registros,
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

  console.log('Registros totales:', registros.length);
  console.log('Registros filtrados:', registrosFiltrados.length);
  console.log('Datos PALACE:', registrosFiltrados.filter(r => r.puntodeventa?.toUpperCase().includes('PALACE')));
  console.log('Datos SONOCO:', registrosFiltrados.filter(r => r.puntodeventa?.toUpperCase().includes('SONOCO')));
  console.log('Datos ESPAÑA:', registrosFiltrados.filter(r => r.puntodeventa?.toUpperCase().includes('ESPAÑA')));

  // Lista completa de puntos de venta
  const todosPuntos = [
    "PALACE", "PORTAL DE JD 1", "PORTAL DE JD 2", "PORTAL DEL JORDAN 1", "PORTAL DEL JORDAN 2",
    "SOCORRO", "SUERTE", "VILLA PAULINA", "PARQUE 2 (POLO)", "SUPERINTER",
    "GALERIA 1", "GALERIA NUEVO", "SONOCO", "CASTILLO", "COUNTRY MALL", "CASA VERDI",
    "ESPAÑA", "FLORENCIA", "HACIENDA", "MONTEBELLO", "PARQUE DEL AMOR", "CIRCUNVALAR",
    "PASO LA BOLSA", "BONANZA 1", "BONANZA 2", "BONANZA 3", "BONANZA PPAL", "POTRERITO",
    "CARIBE FARALLONES", "CIUDADELA LAS FLORES 1", "CIUDADELA LAS FLORES 2", "MARBELLA 1",
    "MARBELLA 2", "VILLEGAS", "PINOS", "ADRIANITA", "CAÑAVERAL", "CARBONERO", "CARIBE",
    "CENTENARIO", "CONFANDI NUEVO", "PILOTO 1", "ESMERALDA", "14 ALFAGUARA", "CONDADOS",
    "GRAN COLOMBIA", "GYM MODERNO", "HOSPITAL", "PANGOS", "PLAZA AIRONE", "SACHAMATE 1",
    "SACHAMATE 2", "PARQUEADERO", "SIMON BOLIVAR", "ESTACIONES 2 TERRANOVA", "PAISAJE LAS FLORES",
    "TERRANOVA 1", "TERRANOVA 2", "TERRANOVA 3", "TERRANOVA 5", "TERRANOVA 6",
    "PRINCIPAL (MESON)", "CAJERAS OFIC PPAL", "CONTAB OFIC PPAL", "TESOSERIA OFIC PPAL", "MONSERRATE"
  ];

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
  todosPuntos.forEach(punto => {
    const cronogramasPunto = registrosFiltrados.filter(r => 
      r.puntodeventa?.toUpperCase().trim() === punto.toUpperCase().trim()
    );
    
    // Debug para puntos con cronogramas
    if (cronogramasPunto.length > 0) {
      console.log(`${punto}: ${cronogramasPunto.length} cronogramas`, 
        cronogramasPunto.map(c => {
          const fechaCompleta = c.dia;
          const fechaSolo = c.dia.split('T')[0];
          return { fechaCompleta, fechaSolo };
        }));
    }
    
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

    const row = ws.addRow([punto, diasProgramados, ...valoresDias.map(v => v.valor)]);
    
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
        
        console.log(`Celda ${punto} día ${index + 1}: estado="${diaData.estado}", esCerrado=${esCerrado}`);
        
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: esCerrado ? 'FFFF0000' : 'FF92D050' } // Rojo si está cerrado, verde si no
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
