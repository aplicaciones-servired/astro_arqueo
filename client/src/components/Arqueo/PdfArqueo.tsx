import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default async function generatePDF(data: any) {
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

  /**
   * Construye un mapa a partir de tiles individuales de OSM sobre un <canvas>,
   * dibuja un marcador rojo y lo incrusta en el PDF.
   *
   * Por qué tiles y no staticmap:
   *  - staticmap.openstreetmap.de bloquea fetch() desde el navegador (CORS).
   *  - Los tiles de tile.openstreetmap.org sí incluyen Access-Control-Allow-Origin: *,
   *    por lo que se pueden cargar con <img crossOrigin="anonymous"> y dibujar en canvas.
   *
   * El proceso:
   *  1. Calcula las coordenadas del tile central (xtile, ytile) para zoom 16.
   *  2. Carga una cuadrícula de 3×3 tiles (768×768 px) centrada en la coordenada.
   *  3. Dibuja cada tile en el canvas a medida que carga.
   *  4. Cuando todos cargan, dibuja el marcador rojo encima.
   *  5. canvas.toDataURL("image/png") da el base64 que inserta jsPDF.
   */
  const addMapToPDF = (lat: number, lng: number, nombre: string): Promise<void> =>
    new Promise((resolve) => {
      try {
        const zoom  = 18;
        const TILE  = 256;   // px por tile
        const GRIDX = 8;     // 8 tiles horizontales → canvas 2048px (mismo área que 4@zoom17, 4× más nítido)
        const GRIDY = 4;     // 4 tiles verticales   → canvas 1024px, ratio 2:1

        // ── Conversión lat/lng → tile x,y (fórmula estándar OSM) ──────────
        const lat_rad = (lat * Math.PI) / 180;
        const n = Math.pow(2, zoom);
        const xtileF = ((lng + 180) / 360) * n;
        const ytileF = ((1 - Math.log(Math.tan(lat_rad) + 1 / Math.cos(lat_rad)) / Math.PI) / 2) * n;
        const xtile  = Math.floor(xtileF);
        const ytile  = Math.floor(ytileF);

        // Offset del tile origen (esquina superior izquierda del canvas)
        const originX = xtile - Math.floor(GRIDX / 2);  // tile más a la izquierda
        const originY = ytile - Math.floor(GRIDY / 2);  // tile más arriba

        // Posición del marcador en píxeles dentro del canvas (GRIDX*256 × GRIDY*256)
        const markerX = Math.round((xtileF - originX) * TILE);
        const markerY = Math.round((ytileF - originY) * TILE);

        // ── Canvas offscreen ───────────────────────────────────────────────
        const canvas = document.createElement("canvas");
        canvas.width  = TILE * GRIDX;  // 2048
        canvas.height = TILE * GRIDY;  // 1024
        const ctx = canvas.getContext("2d")!;

        const totalTiles = GRIDX * GRIDY; // 32
        let loaded = 0;

        const onAllLoaded = () => {
          // ── Marcador rojo (escalado al doble para canvas 2048×1024) ──
          // Sombra
          ctx.beginPath();
          ctx.arc(markerX + 4, markerY - 20, 18, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,0,0,0.25)";
          ctx.fill();
          // Círculo rojo
          ctx.beginPath();
          ctx.arc(markerX, markerY - 24, 18, 0, Math.PI * 2);
          ctx.fillStyle = "#dc2626";
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 5;
          ctx.stroke();
          // Punto blanco central
          ctx.beginPath();
          ctx.arc(markerX, markerY - 24, 6, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          // ── Popup / etiqueta sobre el marcador (al estilo Leaflet) ──────
          const labelName  = nombre;
          const labelCoord = `${lat}, ${lng}`;
          const boxW  = 340;
          const boxH  = 80;
          const boxX  = markerX - boxW / 2;
          const boxY  = markerY - 24 - 18 - boxH - 16; // encima del marcador
          const radius = 8;

          // Fondo blanco con borde gris y sombra
          ctx.shadowColor = "rgba(0,0,0,0.20)";
          ctx.shadowBlur  = 12;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 3;
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#c0c0c0";
          ctx.lineWidth = 2;
          // Rectángulo redondeado
          ctx.beginPath();
          ctx.moveTo(boxX + radius, boxY);
          ctx.lineTo(boxX + boxW - radius, boxY);
          ctx.quadraticCurveTo(boxX + boxW, boxY, boxX + boxW, boxY + radius);
          ctx.lineTo(boxX + boxW, boxY + boxH - radius);
          ctx.quadraticCurveTo(boxX + boxW, boxY + boxH, boxX + boxW - radius, boxY + boxH);
          // Cola triangular apuntando al marcador
          ctx.lineTo(markerX + 14, boxY + boxH);
          ctx.lineTo(markerX,     boxY + boxH + 16);
          ctx.lineTo(markerX - 14, boxY + boxH);
          ctx.lineTo(boxX + radius, boxY + boxH);
          ctx.quadraticCurveTo(boxX, boxY + boxH, boxX, boxY + boxH - radius);
          ctx.lineTo(boxX, boxY + radius);
          ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.shadowColor = "transparent";

          // Texto: nombre (negrita)
          ctx.fillStyle = "#111827";
          ctx.font = "bold 28px sans-serif";
          ctx.fillText(String(labelName), boxX + 18, boxY + 36);
          // Texto: coordenadas (gris, más pequeño)
          ctx.fillStyle = "#6b7280";
          ctx.font = "22px sans-serif";
          ctx.fillText(labelCoord, boxX + 18, boxY + 64);

          // ── Exportar a base64 e incrustar en PDF ───────────────────────
          try {
            const base64 = canvas.toDataURL("image/png");
            const imgW = 170;
            const imgH = 85; // proporción 2:1 — igual que el canvas 1024×512

            if (yPosition + imgH + 22 > doc.internal.pageSize.height - 10) {
              doc.addPage();
              yPosition = 20;
            }

            // Título
            doc.setFillColor(240, 240, 240);
            doc.roundedRect(20, yPosition - 1, 170, 8, 2, 2, "F");
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(50, 50, 50);
            doc.text("Ubicación en el Mapa", 105, yPosition + 5, { align: "center" });
            yPosition += 10;

            // Borde
            doc.setDrawColor(100, 116, 139);
            doc.setLineWidth(0.3);
            doc.roundedRect(19, yPosition - 1, imgW + 2, imgH + 2, 2, 2);

            // Imagen (sin distorsión: canvas y PDF tienen el mismo ratio 2:1)
            doc.addImage(base64, "PNG", 20, yPosition, imgW, imgH, undefined, "FAST");
            yPosition += imgH + 4;

            // Créditos y coordenadas
            doc.setFontSize(7);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(100, 116, 139);
            doc.text(
              `${nombre}  |  Lat: ${lat}  Lng: ${lng}  |  © OpenStreetMap contributors`,
              105, yPosition + 3, { align: "center" }
            );
            doc.setTextColor(0, 0, 0);
            yPosition += 10;
          } catch (_) {/* silencio */}
          resolve();
        };

        // ── Cargar los tiles ───────────────────────────────────────────────
        for (let dy = 0; dy < GRIDY; dy++) {
          for (let dx = 0; dx < GRIDX; dx++) {
            const tx = originX + dx;
            const ty = originY + dy;
            const drawX = dx * TILE;
            const drawY = dy * TILE;

            const img = new Image();
            img.crossOrigin = "anonymous"; // OSM tiles tienen CORS abierto
            img.onload = () => {
              ctx.drawImage(img, drawX, drawY, TILE, TILE);
              loaded++;
              if (loaded === totalTiles) onAllLoaded();
            };
            img.onerror = () => {
              ctx.fillStyle = "#e5e7eb";
              ctx.fillRect(drawX, drawY, TILE, TILE);
              loaded++;
              if (loaded === totalTiles) onAllLoaded();
            };
            img.src = `https://tile.openstreetmap.org/${zoom}/${tx}/${ty}.png`;
          }
        }
      } catch (_) {
        resolve(); // Error inesperado → omitir el mapa sin romper el PDF
      }
    });

  // Información adicional
  if (items.nombre_observacion || items.fechavisita || items.horavisita || items.latitud || items.longitud) {
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

    // Mapa estático justo debajo de las coordenadas
    if (items.latitud && items.longitud) {
      await addMapToPDF(
        Number(items.latitud),
        Number(items.longitud),
        String(items.puntodeventa ?? "Punto de Venta")
      );
    }
  }

  // ─── Utilidades de imagen ────────────────────────────────────────────────
  /** Detecta el formato de imagen a partir del encabezado base64 */
  const getImageFormat = (imageData: string): string => {
    if (imageData.startsWith("data:image/png")) return "PNG";
    if (imageData.startsWith("data:image/webp")) return "WEBP";
    return "JPEG";
  };

  /**
   * Calcula las dimensiones manteniendo la relación de aspecto
   * a partir de un elemento Image cargado en memoria.
   */
  const fitDimensions = (
    naturalW: number,
    naturalH: number,
    maxW: number,
    maxH: number
  ): [number, number] => {
    const ratio = Math.min(maxW / naturalW, maxH / naturalH);
    return [naturalW * ratio, naturalH * ratio];
  };

  /**
   * Agrega una imagen centrada en la página con título y borde decorativo.
   * Devuelve una Promise para aguardar la carga de la imagen antes de dibujar.
   */
  const addImageToPDF = (
    imageData: string | null,
    title: string,
    maxW = 170,
    maxH = 130
  ): Promise<void> => {
    return new Promise((resolve) => {
      if (!imageData) return resolve();

      try {
        const img = new Image();
        img.onload = () => {
          try {
            if (yPosition > 220) {
              doc.addPage();
              yPosition = 20;
            }

            // Título con fondo gris claro
            doc.setFillColor(240, 240, 240);
            doc.roundedRect(20, yPosition - 1, 170, 8, 2, 2, "F");
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(50, 50, 50);
            doc.text(title, 105, yPosition + 5, { align: "center" });
            yPosition += 10;

            // Dimensiones respetando proporción
            const [imgW, imgH] = fitDimensions(
              img.naturalWidth,
              img.naturalHeight,
              maxW,
              maxH
            );
            const xOffset = 20 + (170 - imgW) / 2; // centrar horizontalmente

            // Borde exterior
            doc.setDrawColor(180, 180, 180);
            doc.setLineWidth(0.4);
            doc.roundedRect(xOffset - 2, yPosition - 2, imgW + 4, imgH + 4, 3, 3);

            // Imagen
            const format = getImageFormat(imageData);
            doc.addImage(imageData, format, xOffset, yPosition, imgW, imgH, undefined, "FAST");

            yPosition += imgH + 12;
            doc.setTextColor(0, 0, 0);
          } catch (_) {/* silenciar error de imagen individual */}
          resolve();
        };
        img.onerror = () => resolve();
        img.src = imageData;
      } catch (_) {
        resolve();
      }
    });
  };

  /**
   * Agrega dos imágenes (firmas) en columnas paralelas para optimizar espacio.
   */
  const addTwoImagesRow = (
    img1: string | null,
    title1: string,
    img2: string | null,
    title2: string
  ): Promise<void> => {
    return new Promise((resolve) => {
      const colW = 80;
      const colH = 80;
      const toLoad = [img1, img2].filter(Boolean) as string[];
      if (toLoad.length === 0) return resolve();

      let loaded = 0;
      const images: HTMLImageElement[] = [new Image(), new Image()];

      const tryDraw = () => {
        loaded++;
        if (loaded < toLoad.length) return;

        try {
          if (yPosition > 220) {
            doc.addPage();
            yPosition = 20;
          }

          const drawCol = (imgData: string | null, imgEl: HTMLImageElement, title: string, x: number) => {
            if (!imgData) return;

            // Título de columna
            doc.setFillColor(240, 240, 240);
            doc.roundedRect(x, yPosition - 1, colW, 8, 2, 2, "F");
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(50, 50, 50);
            doc.text(title, x + colW / 2, yPosition + 5, { align: "center" });

            const [iW, iH] = fitDimensions(imgEl.naturalWidth, imgEl.naturalHeight, colW - 4, colH);
            const xImg = x + (colW - iW) / 2;

            doc.setDrawColor(180, 180, 180);
            doc.setLineWidth(0.4);
            doc.roundedRect(xImg - 2, yPosition + 9, iW + 4, iH + 4, 3, 3);

            const fmt = getImageFormat(imgData);
            doc.addImage(imgData, fmt, xImg, yPosition + 10, iW, iH, undefined, "FAST");
          };

          if (img1) drawCol(img1, images[0], title1, 20);
          if (img2) drawCol(img2, images[img1 ? 1 : 0], title2, img1 ? 110 : 20);

          const maxH = colH + 16;
          yPosition += maxH;
          doc.setTextColor(0, 0, 0);
        } catch (_) {/* silencio */}
        resolve();
      };

      if (img1) { images[0].onload = tryDraw; images[0].onerror = tryDraw; images[0].src = img1; }
      if (img2) { images[1].onload = tryDraw; images[1].onerror = tryDraw; images[1].src = img2; }
    });
  };

  // ─── Agregar las imágenes disponibles ────────────────────────────────────
  if (items.firma_auditoria || items.firma_colocadora || items.imagen_observacion) {
    doc.addPage();
    yPosition = 20;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Imágenes y Firmas", 105, yPosition, { align: "center" });

    // Línea decorativa bajo el título
    doc.setDrawColor(220, 53, 69);
    doc.setLineWidth(0.8);
    doc.line(40, yPosition + 4, 170, yPosition + 4);
    yPosition += 14;

    // Imagen de observación a ancho completo
    await addImageToPDF(items.imagen_observacion, "Imagen de Observación", 170, 140);

    // Firmas en dos columnas paralelas
    if (items.firma_auditoria || items.firma_colocadora) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }
      await addTwoImagesRow(
        items.firma_auditoria || null,
        "Firma Auditoría",
        items.firma_colocadora || null,
        "Firma Colocadora"
      );
    }
  }

  // Guardar el PDF
  doc.save(
    `Arqueo_${items.documento || items.id}_${
      new Date().toISOString().split("T")[0]
    }.pdf`
  );
}
