// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),

  // 👇 Agregar esta sección para el puerto dentro del contenedor
  server: {
    host: true,     // Escucha en todas las interfaces (necesario en Docker)
    port: 4321,     // Debe coincidir con el puerto que expones en el Dockerfile
  },

  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY": JSON.stringify(
        process.env.PUBLIC_CLERK_PUBLISHABLE_KEY
      ),
      "import.meta.env.CLERK_SECRET_KEY": JSON.stringify(
        process.env.CLERK_SECRET_KEY
      ),
    },
  },

  integrations: [
    react(),
    clerk({
      publishableKey: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    }),
  ],
});
