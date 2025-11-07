import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import auth from "auth-astro";
import node from "@astrojs/node";

export default defineConfig({
  adapter: node({
    mode: "standalone" // Esto genera un servidor Node.js ejecutable
  }),
  alias: {
    "@": "./src", // 👈 importante el "./"
  },
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      AUTH_SECRET: envField.string({ context: "server", access: "public" }),
    },
  },
  integrations: [
   react({
      include: ['**/react/*'], // ← Especificar dónde están tus componentes React
      experimentalReactChildren: true
    }),
    auth({
      prefix: "/api/auth",
    }),
  ],
});
