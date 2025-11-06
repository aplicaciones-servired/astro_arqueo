import { defineConfig } from "auth-astro";
import Credentials from "@auth/core/providers/credentials";
import { AUTH_SECRET } from "astro:env/server";

export default defineConfig({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:9010/api/v2/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await res.json().catch((e) => {
          return null;
        });

        // ⚠️ Validamos
        if (!res.ok) {
          const message = data?.message || "Usuario no encontrado o credenciales inválidas";
          // ⛔ Lanzamos error, no devolvemos null
          throw new Error(message);
        }

        if (!data || !data.user) {
          return null;
        }

        const user = {
          id: data.user.id,
          name: `${data.user.names} ${data.user.lastnames}`,
          email: data.user.email,
          username: data.user.username,
          company: data.user.company,
          process: data.user.process,
          sub_process: data.user.sub_process,
          state: data.user.state,
        };

        return user;
      },
    }),
  ],
  secret: AUTH_SECRET,
});
