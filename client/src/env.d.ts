interface ImportMetaEnv {
  readonly VITE_API_URL_LOGIN: string;
  readonly VITE_URL_API: string;
  readonly AUTH_SECRET: string;
  // agrega otras variables que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
