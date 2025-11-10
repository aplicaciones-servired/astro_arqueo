import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";

export default defineConfig({
  adapter: node({ mode: "standalone" }),
  output: "server",
  alias: { "@": "./src" },
  vite: { plugins: [tailwindcss()] },
  env: {
    schema: {
      // 🔒 clave secreta solo en el servidor
      CLERK_SECRET_KEY: envField.string({ context: "server", access: "secret" }),
      // 🌍 clave pública para el navegador (Clerk lo necesita en cliente)
      PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  integrations: [
    react({ include: ["**/react/*"], experimentalReactChildren: true }),
    clerk(),
  ],
});
