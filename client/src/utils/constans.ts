// --- Empresas y tipos disponibles
export const empresas = ['Multired', 'Servired'];
export const tipos = ['PROGRAMACION DEL MES', 'ARQUEO DE RETIRO'];

// utils/constans.js
// --- Variables de entorno públicas (client + server)
export const API_URL = import.meta.env.PUBLIC_URL_API || '/api';

// Para DEBUG - esto debería mostrarse en el cliente
console.log('🔧 API_URL config:', {
  envValue: import.meta.env.PUBLIC_URL_API,
  finalValue: API_URL,
  allEnv: import.meta.env
});
