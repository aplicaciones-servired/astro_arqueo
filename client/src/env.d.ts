/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_LOGIN: string;
  readonly VITE_URL_API: string;
  readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  readonly CLERK_SECRET_KEY: string;
  // 🔹 Agrega aquí otras variables que uses, si las tienes
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
