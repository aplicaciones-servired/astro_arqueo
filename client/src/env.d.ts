/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_LOGIN: string;
  readonly VITE_URL_API: string;
  readonly AUTH_SECRET: string;
  // 🔹 Agrega aquí otras variables que uses, si las tienes
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
