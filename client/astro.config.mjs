import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import auth from "auth-astro";

export default defineConfig({
  adapter: netlify(),
  alias: {
    "@": "./src", // 👈 importante el "./"
  },
  output: "static",
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
