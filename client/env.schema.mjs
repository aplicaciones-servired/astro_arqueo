// src/env.schema.mjs
import { defineConfig, z } from "astro/config";

export default defineConfig({
  env: {
    schema: {
      PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
      CLERK_SECRET_KEY: z.string(),
      VITE_API_URL_LOGIN: z.string(),
      VITE_URL_API: z.string(),
    },
  },
});
