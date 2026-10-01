// --- Variables de entorno públicas (client + server)
export const API_URL = import.meta.env.PUBLIC_URL_API;

// --- Empresas y tipos disponibles
export const empresas = ['Multired', 'Servired'];
export const tipos = ['PROGRAMACION DEL MES', 'ARQUEO DE RETIRO'];

export const meses = [
    { valor: 1, nombre: "Enero" },
    { valor: 2, nombre: "Febrero" },
    { valor: 3, nombre: "Marzo" },
    { valor: 4, nombre: "Abril" },
    { valor: 5, nombre: "Mayo" },
    { valor: 6, nombre: "Junio" },
    { valor: 7, nombre: "Julio" },
    { valor: 8, nombre: "Agosto" },
    { valor: 9, nombre: "Septiembre" },
    { valor: 10, nombre: "Octubre" },
    { valor: 11, nombre: "Noviembre" },
    { valor: 12, nombre: "Diciembre" },
  ];


export const tipoSucursal = [
  { valor: 'TAT', nombre: 'TAT' },
  { valor: 'PF', nombre: 'PUNTO FIJO' },
  { valor: 'MOVIL', nombre: 'MOVIL' }
];

// --- Formato de arqueo: preguntas 1..44 (campos requisitoN / observacionN)

export const TOTAL_REQUISITOS_ARQUEO = 44;

export const PREGUNTAS_ARQUEO: Record<number, string> = {
  1: '¿Tiene la puerta asegurada?',
  2: '¿Elementos de aseo, sillas, computador, iluminación en buen estado?',
  3: '¿Aviso de videovigilancia y cámaras?',
  4: '¿Utiliza Superflex?',
  5: '¿Tiene caja fuerte?',
  6: '¿Tiene caja digital auxiliar? ¿Conoce las bases de efectivo asignadas para caja digital y principal?',
  7: '¿Las recargas se hacen a través la Red propia de la Cia?',
  8: '¿Cumple con los topes de efectivo establecidos en caja digital y principal?',
  9: '¿Tiene los premios descargados? ¿Conoce los requisitos y montos máximos para pago de premios?',
  10: '¿La lotería física tiene impreso el nombre de la Cia o de Servicios Transaccionales?',
  11: '¿Publicidad exhibida actualizada?',
  12: '¿Aviso externo de "Vigilado y Controlado Mintic" y "Colaborador Autorizado"?',
  13: '¿Afiche MINTIC SUPERGIROS (contiene aviso de canales de comunicación, o tarifario condiciones del servicio, sticker tirilla electrónica CRC)?',
  14: '¿Calendario resultados Superastro diligenciado (tiene que tener los resultados)?',
  15: '¿Presta servicio de Western Union (es obligatorio para cajeros digitales)?',
  16: '¿Calendarios de acumulados (Baloto - Miloto - Colorloto)?',
  17: '¿Tablero de resultados y acumulados actualizados?',
  18: '¿Licencia de funcionamiento de Beneficencia del Valle con año actualizado?',
  19: '¿Tiene equipos de Betplay y/o máquinas de ruta? Si los tiene debe tener el aviso "Autoriza Coljuegos"',
  20: '¿Tiene aviso código QR para PQR?',
  21: '¿Verificar el cableado?',
  22: '¿Tiene prendas emblemáticas y presentación adecuada?',
  23: '¿El usuario corresponde a la cédula del mismo?',
  24: '¿Tiene usuario de giros? ¿Presta el servicio?',
  25: '¿Tiene usuario de la ONJ (para Baloto, Miloto, Colorloto)?',
  26: '¿Tiene usuario de SUPERFLEX?',
  27: '¿Tiene usuario de CORREDOR EMPRESARIAL (astro, chance millonario, Betplay)?',
  28: '¿Está realizando recaudo en tesorería BNET a la compañera?',
  29: '¿Está comercializando el portafolio completo?',
  30: '¿Solicita el documento de identificación al cliente?',
  31: '¿Conoce Supervoucher, funciona?',
  32: '¿Conoce el procedimiento para remitentes y destinatarios menores de edad?',
  33: '¿Conoce los reportes de operaciones en efectivo (R.O.E) firmas, huellas? (Transacciones >= $10.000.000)',
  34: '¿El Supervisor Cial realiza las visitas?',
  35: '¿Conoce los términos SARL, SARLAFT, SARO, operación inusual y operación sospechosa?',
  36: '¿Considera que recibe atención oportuna por parte del proceso de cartera?',
  37: '¿Considera que recibe atención oportuna por parte del proceso de sistemas?',
  38: '¿Considera que recibe atención oportuna por parte de la zona (fuerza de ventas)?',
  39: '¿Considera que recibe atención oportuna por parte del proceso de tangibles (raspas,...)?',
  40: '¿Se ha quedado sin venta por falta de rollos de chance?',
  41: '¿Se ha quedado sin venta por falta de rollos de papelería blanca?',
  42: '¿Considera que recibe atención oportuna para anulación de formularios?',
  43: '¿Considera que recibe atención oportuna para anulación de recaudos de convenios?',
  44: '¿Algo adicional que considere agregar?',
};

export const getPreguntaArqueo = (n: number): string =>
  PREGUNTAS_ARQUEO[n] ?? `Pregunta ${n}`;

export const SECCIONES_ARQUEO = [
  { titulo: 'Verificación del PDV', desde: 1, hasta: 21, accent: 'bg-blue-700' },
  { titulo: 'Cajero y/o Colocador', desde: 22, hasta: 35, accent: 'bg-emerald-700' },
  { titulo: 'Lista de Chequeo de CIS', desde: 36, hasta: 44, accent: 'bg-cyan-700' },
];
