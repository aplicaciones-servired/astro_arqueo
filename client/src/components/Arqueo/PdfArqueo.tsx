import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generatePDF(data: any) {
  if (!data || data.length === 0) {
    alert("No hay datos para generar el PDF");
    return;
  }

  const doc = new jsPDF();
  const items = data[0];

  // Título del documento
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Detalle de Arqueo", 105, 15, { align: "center" });

  // Línea separadora
  doc.setLineWidth(0.5);
  doc.line(20, 20, 190, 20);

  let yPosition = 30;

  // Información general - solo si hay datos
  const generalInfo = [];
  if (items.supervisor) generalInfo.push(["Supervisor", items.supervisor]);
  if (items.documento) generalInfo.push(["Documento", items.documento]);
  if (items.nombres) generalInfo.push(["Nombres", items.nombres]);
  if (items.sucursal) generalInfo.push(["Sucursal", items.sucursal]);
  if (items.puntodeventa)
    generalInfo.push(["Punto de Venta", items.puntodeventa]);

  if (generalInfo.length > 0) {
    autoTable(doc, {
      startY: yPosition,
      head: [["Campo", "Valor"]],
      body: generalInfo,
      theme: "striped",
      headStyles: { fillColor: [220, 53, 69], fontSize: 12 },
      bodyStyles: { fontSize: 11 },
      margin: { left: 20, right: 20 },
    });
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }

  // Información financiera - solo si hay datos
  const financialInfo = [];
  if (items.ventabruta) financialInfo.push(["Venta Bruta", items.ventabruta]);
  if (items.baseefectivo)
    financialInfo.push(["Base Efectivo", items.baseefectivo]);
  if (items.totalingreso)
    financialInfo.push(["Total Ingreso", items.totalingreso]);
  if (items.chancesabonados)
    financialInfo.push(["Chances Abonados", items.chancesabonados]);
  if (items.chancespreimpresos)
    financialInfo.push(["Chances Preimpresos", items.chancespreimpresos]);
  if (items.premiospagados)
    financialInfo.push(["Premios Pagados", items.premiospagados]);
  if (items.efectivocajafuerte)
    financialInfo.push(["Efectivo Caja Fuerte", items.efectivocajafuerte]);
  if (items.tirillarecaudo)
    financialInfo.push(["Tirilla Recaudo", items.tirillarecaudo]);
  if (items.totalegresos)
    financialInfo.push(["Total Egresos", items.totalegresos]);

  if (financialInfo.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Información Financiera", 20, yPosition);
    yPosition += 5;

    autoTable(doc, {
      startY: yPosition,
      head: [["Concepto", "Valor"]],
      body: financialInfo,
      theme: "striped",
      headStyles: { fillColor: [220, 53, 69], fontSize: 12 },
      bodyStyles: { fontSize: 11 },
      margin: { left: 20, right: 20 },
    });
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }

  // Totales - solo si hay datos
  const totalsInfo = [];
  if (items.totalbilletes)
    totalsInfo.push(["Total Billetes", items.totalbilletes]);
  if (items.totalmonedas)
    totalsInfo.push(["Total Monedas", items.totalmonedas]);
  if (items.totalarqueo) totalsInfo.push(["Total Items", items.totalarqueo]);
  if (items.sobrantefaltante)
    totalsInfo.push(["Sobrante/Faltante", items.sobrantefaltante]);
  if (items.totalbilletescaja)
    totalsInfo.push(["Total Billetes Caja", items.totalbilletescaja]);
  if (items.totalmonedascaja)
    totalsInfo.push(["Total Monedas Caja", items.totalmonedascaja]);
  if (items.totalpremioscaja)
    totalsInfo.push(["Total Premios Caja", items.totalpremioscaja]);
  if (items.total) totalsInfo.push(["Total", items.total]);

  if (totalsInfo.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Totales y Resumen", 20, yPosition);
    yPosition += 5;

    autoTable(doc, {
      startY: yPosition,
      head: [["Concepto", "Valor"]],
      body: totalsInfo,
      theme: "striped",
      headStyles: { fillColor: [220, 53, 69], fontSize: 12 },
      bodyStyles: { fontSize: 11 },
      margin: { left: 20, right: 20 },
    });
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }

  // Nueva página si hay información de juegos
  if (items.nombre_juego && items.nombre_juego !== 0) {
    doc.addPage();
    yPosition = 20;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Información de Juegos", 105, yPosition, { align: "center" });
    yPosition += 10;

    const gamesInfo = [];

    // Juego 1
    if (items.nombre_juego && items.nombre_juego !== 0) {
      gamesInfo.push(
        ["Juego 1", ""],
        ["Nombre", items.nombre_juego || ""],
        ["Cantidad BNET", items.cantidad_bnet || ""],
        ["Cantidad Físicos", items.cantidad_fisicos || ""],
        ["Cantidad Faltante", items.cantidad_faltante || ""],
        ["Valor Tiquete", items.cantidad_tiquete || ""],
        ["Descargado", items.descargado || ""]
      );
    }

    // Juego 2
    if (items.nombre_juego2 && items.nombre_juego2 !== 0) {
      gamesInfo.push(
        ["Juego 2", ""],
        ["Nombre", items.nombre_juego2 || ""],
        ["Cantidad BNET", items.cantidad_bnet2 || ""],
        ["Cantidad Físicos", items.cantidad_fisicos2 || ""],
        ["Cantidad Faltante", items.cantidad_faltante2 || ""],
        ["Valor Tiquete", items.cantidad_tiquete2 || ""],
        ["Descargado", items.descargado2 || ""]
      );
    }

    // Juego 3
    if (items.nombre_juego3 && items.nombre_juego3 !== 0) {
      gamesInfo.push(
        ["Juego 3", ""],
        ["Nombre", items.nombre_juego3 || ""],
        ["Cantidad BNET", items.cantidad_bnet3 || ""],
        ["Cantidad Físicos", items.cantidad_fisicos3 || ""],
        ["Cantidad Faltante", items.cantidad_faltante3 || ""],
        ["Valor Tiquete", items.cantidad_tiquete3 || ""],
        ["Descargado", items.descargado3 || ""]
      );
    }

    // Juego 4
    if (items.nombre_juego4 && items.nombre_juego4 !== 0) {
      gamesInfo.push(
        ["Juego 4", ""],
        ["Nombre", items.nombre_juego4 || ""],
        ["Cantidad BNET", items.cantidad_bnet4 || ""],
        ["Cantidad Físicos", items.cantidad_fisicos4 || ""],
        ["Cantidad Faltante", items.cantidad_faltante4 || ""],
        ["Valor Tiquete", items.cantidad_tiquete4 || ""],
        ["Descargado", items.descargado4 || ""]
      );
    }

    // Juego 5
    if (items.nombre_juego5 && items.nombre_juego5 !== 0) {
      gamesInfo.push(
        ["Juego 5", ""],
        ["Nombre", items.nombre_juego5 || ""],
        ["Cantidad BNET", items.cantidad_bnet5 || ""],
        ["Cantidad Físicos", items.cantidad_fisicos5 || ""],
        ["Cantidad Faltante", items.cantidad_faltante5 || ""],
        ["Valor Tiquete", items.cantidad_tiquete5 || ""],
        ["Descargado", items.descargado5 || ""]
      );
    }

    // Juego 6
    if (items.nombre_juego6 && items.nombre_juego6 !== 0) {
      gamesInfo.push(
        ["Juego 6", ""],
        ["Nombre", items.nombre_juego6 || ""],
        ["Cantidad BNET", items.cantidad_bnet6 || ""],
        ["Cantidad Físicos", items.cantidad_fisicos6 || ""],
        ["Cantidad Faltante", items.cantidad_faltante6 || ""],
        ["Valor Tiquete", items.cantidad_tiquete6 || ""],
        ["Descargado", items.descargado6 || ""]
      );
    }

    if (gamesInfo.length > 0) {
      autoTable(doc, {
        startY: yPosition,
        head: [["Campo", "Valor"]],
        body: gamesInfo,
        theme: "striped",
        headStyles: { fillColor: [220, 53, 69] },
        margin: { left: 20, right: 20 },
      });
    }
  }

  // Información de rollos - solo si hay datos
  const rollosInfo = [];
  if (items.rollos_bnet) rollosInfo.push(["Rollos BNET", items.rollos_bnet]);
  if (items.rollos_fisicos)
    rollosInfo.push(["Rollos Físicos", items.rollos_fisicos]);
  if (items.diferencia) rollosInfo.push(["Diferencia", items.diferencia]);

  if (rollosInfo.length > 0) {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Información de Rollos", 20, yPosition);
    yPosition += 5;

    autoTable(doc, {
      startY: yPosition,
      head: [["Concepto", "Valor"]],
      body: rollosInfo,
      theme: "striped",
      headStyles: { fillColor: [220, 53, 69], fontSize: 12 },
      bodyStyles: { fontSize: 11 },
      margin: { left: 20, right: 20 },
    });
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }

  // Mapeo de preguntas
  const questionMap: Record<number, string> = {
    1: "¿Tiene la puerta asegurada?",
    2: "¿Elementos de aseo, sillas, computador, iluminación en buen estado?",
    3: "¿Aviso de videovigilancia y cámaras?",
    4: "¿Utiliza Superflex?",
    5: "¿Tiene caja fuerte?",
    6: "¿Tiene caja digital auxiliar? ¿Conoce las bases de efectivo asignadas para caja digital y principal?",
    7: "¿Las recargas se hacen a través la Red propia de la Cia?",
    8: "¿Cumple con los topes de efectivo establecidos en caja digital y principal?",
    9: "¿Tiene los premios descargados? ¿Conoce los requisitos y montos máximos para pago de premios?",
    10: "¿La lotería física tiene impreso el nombre de la Cia o de Servicios Transaccionales?",
    11: "¿Publicidad exhibida actualizada?",
    12: "¿Aviso externo de 'Vigilado y Controlado Mintic' y 'Colaborador Autorizado'?",
    13: "¿Afiche MINTIC SUPERGIROS (contiene aviso de canales de comunicación, o tarifario condiciones del servicio, sticker tirilla electrónica CRC)?",
    14: "¿Calendario resultados Superastro diligenciado (tiene que tener los resultados)?",
    15: "¿Presta servicio de Western Union (es obligatorio para cajeros digitales)?",
    16: "¿Calendarios de acumulados (Baloto - Miloto - Colorloto)?",
    17: "¿Tablero de resultados y acumulados actualizados?",
    18: "¿Licencia de funcionamiento de Beneficencia del Valle con año actualizado?",
    19: "¿Tiene equipos de Betplay y/o máquinas de ruta? Si los tiene debe tener el aviso 'Autoriza Coljuegos'",
    20: "¿Tiene aviso código QR para PQR?",
    21: "¿Verificar el cableado?",
    22: "¿Tiene prendas emblemáticas y presentación adecuada?",
    23: "¿El usuario corresponde a la cédula del mismo?",
    24: "¿Tiene usuario de giros? ¿Presta el servicio?",
    25: "¿Tiene usuario de la ONJ (para Baloto, Miloto, Colorloto)?",
    26: "¿Tiene usuario de SUPERFLEX?",
    27: "¿Tiene usuario de CORREDOR EMPRESARIAL (astro, chance millonario, Betplay)?",
    28: "¿Está realizando recaudo en tesorería BNET a la compañera?",
    29: "¿Está comercializando el portafolio completo?",
    30: "¿Solicita el documento de identificación al cliente?",
    31: "¿Conoce Supervoucher, funciona?",
    32: "¿Conoce el procedimiento para remitentes y destinatarios menores de edad?",
    33: "¿Conoce los reportes de operaciones en efectivo (R.O.E) firmas, huellas? (Transacciones >= $10.000.000)",
    34: "¿El Supervisor Cial realiza las visitas?",
    35: "¿Conoce los términos SARL, SARLAFT, SARO, operación inusual y operación sospechosa?",
  };

  // Requisitos y Observaciones (Preguntas)
  yPosition = (doc as any).lastAutoTable.finalY + 10;

  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Requisitos y Observaciones", 20, yPosition);
  yPosition += 5;

  const requisitosInfo = [];
  let hasObservaciones = false;

  // Recorrer todos los requisitos (1-35) - 3 columnas: Pregunta | Respuesta | Observación
  for (let i = 1; i <= 35; i++) {
    const requisitoKey = `requisito${i}` as keyof typeof items;
    const observacionKey = `observacion${i}` as keyof typeof items;

    const requisito = items[requisitoKey];
    const observacion = items[observacionKey];

    // Solo agregar si el requisito tiene contenido
    if (requisito && requisito !== "" && requisito !== "0") {
      const questionText = questionMap[i] || `Pregunta ${i}`;
      const observacionText =
        observacion && observacion !== "" && observacion !== "0"
          ? observacion
          : "";

      // Verificar si hay observaciones
      if (observacionText) {
        hasObservaciones = true;
      }

      // Siempre agregar 3 columnas: Pregunta | Respuesta | Observación
      requisitosInfo.push([questionText, requisito, observacionText]);
    }
  }

  if (requisitosInfo.length > 0) {
    // Tabla con 3 columnas: Pregunta | Respuesta | Observación
    if (hasObservaciones) {
      autoTable(doc, {
        startY: yPosition,
        head: [["Pregunta", "Respuesta", "Observación"]],
        body: requisitosInfo,
        theme: "striped",
        headStyles: { fillColor: [220, 53, 69], fontSize: 11 },
        bodyStyles: { fontSize: 10 },
        margin: { left: 20, right: 20 },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 35 },
          2: { cellWidth: 55 },
        },
        styles: {
          cellPadding: 2,
          overflow: "linebreak",
          cellWidth: "wrap",
        },
      });
    } else {
      // Solo 2 columnas si no hay observaciones: Pregunta | Respuesta
      autoTable(doc, {
        startY: yPosition,
        head: [["Pregunta", "Respuesta"]],
        body: requisitosInfo.map((row) => [row[0], row[1]]),
        theme: "striped",
        headStyles: { fillColor: [220, 53, 69], fontSize: 11 },
        bodyStyles: { fontSize: 10 },
        margin: { left: 20, right: 20 },
        columnStyles: {
          0: { cellWidth: 120 },
          1: { cellWidth: 50 },
        },
        styles: {
          cellPadding: 2,
          overflow: "linebreak",
          cellWidth: "wrap",
        },
      });
    }

    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }

  // Información adicional
  if (items.nombre_observacion || items.fechavisita || items.horavisita) {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Información Adicional", 20, yPosition);
    yPosition += 5;

    const additionalInfo = [];

    if (items.nombre_observacion) {
      additionalInfo.push(["Nombre Observación", items.nombre_observacion]);
    }
    if (items.fechavisita) {
      additionalInfo.push(["Fecha Visita", items.fechavisita]);
    }
    if (items.horavisita) {
      additionalInfo.push(["Hora Visita", items.horavisita]);
    }
    if (items.latitud) {
      additionalInfo.push(["Latitud", items.latitud]);
    }
    if (items.longitud) {
      additionalInfo.push(["Longitud", items.longitud]);
    }

    if (additionalInfo.length > 0) {
      autoTable(doc, {
        startY: yPosition,
        head: [["Campo", "Valor"]],
        body: additionalInfo,
        theme: "striped",
        headStyles: { fillColor: [220, 53, 69] },
        margin: { left: 20, right: 20 },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 10;
    }
  }

  // Agregar imágenes si existen
  const addImageToPDF = (imageData: string | null, title: string) => {
    if (!imageData) return;

    try {
      // Verificar si necesitamos una nueva página
      if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(title, 20, yPosition);
      yPosition += 5;

      // Agregar la imagen con mejor calidad
      const imgWidth = 120;
      const imgHeight = 90;

      doc.addImage(imageData, "JPEG", 20, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 8;
    } catch (error) {}
  };

  // Agregar las imágenes disponibles
  if (
    items.firma_auditoria ||
    items.firma_colocadora ||
    items.imagen_observacion
  ) {
    doc.addPage();
    yPosition = 20;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Imágenes y Firmas", 105, yPosition, { align: "center" });
    yPosition += 10;

    if (items.imagen_observacion) {
      addImageToPDF(items.imagen_observacion, "Imagen de Observación");
    }

    if (items.firma_auditoria) {
      addImageToPDF(items.firma_auditoria, "Firma Auditoría");
    }

    if (items.firma_colocadora) {
      addImageToPDF(items.firma_colocadora, "Firma Colocadora");
    }
  }

  // Guardar el PDF
  doc.save(
    `Arqueo_${items.documento || items.id}_${
      new Date().toISOString().split("T")[0]
    }.pdf`
  );
}
