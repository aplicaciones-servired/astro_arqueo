// --- Empresas y tipos disponibles
export const empresas = ['Multired', 'Servired'];
export const tipos = ['PROGRAMACION DEL MES', 'ARQUEO DE RETIRO'];

// --- Variables de entorno públicas (client + server)
export const API_URL = import.meta.env.PUBLIC_URL_API;

// Para DEBUG - agregar logs
console.log('PUBLIC_URL_API:', import.meta.env.PUBLIC_URL_API);
console.log('All env vars:', import.meta.env);

