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
