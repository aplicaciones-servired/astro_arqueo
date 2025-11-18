import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import { esES } from "@clerk/localizations";

export default defineConfig({
  envPrefix: ["PUBLIC_", "VITE_", "CLERK_", "PUBLIC_CLERK_"],
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
      "import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY": JSON.stringify(process.env.PUBLIC_CLERK_PUBLISHABLE_KEY),
      "import.meta.env.CLERK_SECRET_KEY": JSON.stringify(process.env.CLERK_SECRET_KEY),
      "import.meta.env.PUBLIC_URL_API": JSON.stringify(process.env.PUBLIC_URL_API),
      "import.meta.env.PUBLIC_API_URL_LOGIN": JSON.stringify(process.env.PUBLIC_API_URL_LOGIN),
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