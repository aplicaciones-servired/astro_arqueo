// server/auth.config.ts
import { defineConfig } from "auth-astro";
import Credentials from "@auth/core/providers/credentials";

// Usa process.env directamente, evita astro:env/server
const AUTH_SECRET_VALUE = import.meta.env.AUTH_SECRET ?? "";

export default defineConfig({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await fetch(`${process.env.VITE_URL_API}/v2/login`, {
        //const res = await fetch(`http://localhost:9010/api/v2/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok || !data?.user) {
          throw new Error(data?.message || "Usuario o contraseña inválidos");
        }

        return {
          id: data.user.id,
          name: `${data.user.names} ${data.user.lastnames}`,
          email: data.user.email,
          username: data.user.username,
          company: data.user.company,
          process: data.user.process,
          sub_process: data.user.sub_process,
          state: data.user.state,
        };
      },
    }),
  ],
  secret: AUTH_SECRET_VALUE,
});
