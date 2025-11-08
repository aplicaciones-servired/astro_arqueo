import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import auth from "auth-astro";

export default defineConfig({
  output: "server",
  adapter: undefined, // No uses Netlify si lo estás desplegando con Docker
  alias: {
    "@": "./src",
  },
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
      include: ["**/react/*"],
      experimentalReactChildren: true,
    }),
    auth({
      prefix: "/api/auth",
    }),
  ],
});
