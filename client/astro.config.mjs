// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import { esES } from "@clerk/localizations";

export default defineConfig({
  // Para que Astro lea variables PUBLIC_ y CLERK_
  envPrefix: ["PUBLIC_", "CLERK_", "PUBLIC_CLERK_"],

  output: "server",
  adapter: node({
    mode: "standalone",
  }),

  server: {
    host: true,
    port: 4321,
  },

  vite: {
    plugins: [tailwindcss()],
    define: {
      // Variables públicas necesarias para el cliente
      "import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY": JSON.stringify(process.env.PUBLIC_CLERK_PUBLISHABLE_KEY),
      "import.meta.env.PUBLIC_URL_API": JSON.stringify(process.env.PUBLIC_URL_API),
      "import.meta.env.PUBLIC_API_URL_LOGIN": JSON.stringify(process.env.PUBLIC_API_URL_LOGIN),
      "import.meta.env.PUBLIC_CLERK_FRONTEND_API": JSON.stringify(process.env.PUBLIC_CLERK_FRONTEND_API),
    },

    // ⚠️ Necesario para evitar errores de Clerk en SSR
    ssr: {
      noExternal: ["@clerk/clerk-js"]
    },

    optimizeDeps: {
      include: ["@clerk/clerk-js"]
    }
  },

  integrations: [
    react(),

    // Clerk: configuración correcta
    clerk({
      localization: esES,
      publishableKey: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,

      // Carga del script desde tu subdominio Clerk
      clerkJSUrl:
        "https://clerk.arqueos.serviredgane.cloud/npm/@clerk/clerk-js@5/dist/clerk.browser.js",

      // Dominio del frontend del tenant Clerk
      domain: "clerk.arqueos.serviredgane.cloud",
    }),
  ],
});
