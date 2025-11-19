// src/env.schema.mjs
import { defineConfig, z } from "astro/config";

export default defineConfig({
  env: {
    schema: {
      PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
      PUBLIC_URL_API: z.string(),
    },
  },
});
