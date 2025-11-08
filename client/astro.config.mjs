import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import auth from "auth-astro";
import { JWTAdapter } from "@auth/core/adapters/jwt"; // Adapter JWT

export default defineConfig({
  output: "server",
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
      adapter: JWTAdapter({ secret: process.env.AUTH_SECRET }), // ✅ Adapter JWT
    }),
  ],
});
