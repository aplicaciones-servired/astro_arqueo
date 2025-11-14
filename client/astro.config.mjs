// astro.config.mjs
import { defineConfig, envField } from "astro/config"; // 👈 falta importar envField
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import { esES } from "@clerk/localizations";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),

  // 👇 Configuración del servidor (útil en Docker)
  server: {
    host: true, // Escucha en todas las interfaces
    port: 4321, // Asegúrate de exponer este puerto en tu Dockerfile
  },

  // 👇 Validación y exposición de variables de entorno
  env: {
    schema: {
      PUBLIC_URL_API: envField.string({
        context: "all",
        access: "public",
        optional: true,
      }),
      PUBLIC_API_URL_LOGIN: envField.string({
        context: "all",
        access: "public",
        optional: true,
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY": JSON.stringify(
        process.env.PUBLIC_CLERK_PUBLISHABLE_KEY
      ),
      "import.meta.env.CLERK_SECRET_KEY": JSON.stringify(
        process.env.CLERK_SECRET_KEY
      )
    },
  },

  integrations: [
    react(),
    clerk({
      localization: esES,
      publishableKey: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    }),
  ],
});
