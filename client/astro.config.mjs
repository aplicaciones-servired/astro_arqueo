import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";

export default defineConfig({
  adapter: node({ mode: "standalone" }),
  output: "server",
  alias: { "@": "./src" },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react({ 
      include: ["**/react/*"], 
      experimentalReactChildren: true 
    }),
    clerk({
      publishableKey: import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
    }),
  ],
});