// --- Empresas y tipos disponibles
export const empresas = ['Multired', 'Servired'];
export const tipos = ['PROGRAMACION DEL MES', 'ARQUEO DE RETIRO'];

// --- Variables de entorno públicas (client + server)
// ⚠️ Estas vienen desde tu archivo .env
// PUBLIC_URL_API=https://arqueos.serviredgane.cloud/api
// PUBLIC_API_URL_LOGIN=https://arqueos.serviredgane.cloud/api_login_v

export const API_URL = import.meta.env.PUBLIC_URL_API;
export const API_URL_LOGIN = import.meta.env.PUBLIC_API_URL_LOGIN;

// --- Alias para compatibilidad si usabas nombres antiguos
export const apiUrl = import.meta.env.PUBLIC_URL_API;
export const apiLoginUrl = import.meta.env.PUBLIC_API_URL_LOGIN;

// --- Secret del backend
// ⚠️ IMPORTANTE: Esto solo existe en el servidor. NO en el navegador.
// En el cliente siempre vendrá "undefined" (esto es correcto).
export const authSecret = import.meta.env.CLERK_SECRET_KEY;
