import { useState } from "react";
import { signIn } from "auth-astro/client";
import { toast } from "sonner";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorString, setErrorString] = useState("");

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const loginPromise = new Promise(async (resolve, reject) => {
      try {
        // ✅ Solución completa al error TS2353
        const result = await signIn("credentials", {
          username,
          password,
          redirect: false,
          callbackUrl: "/getarqueo",
        } as any);


        // ✅ Verificamos si result existe
        if (!result) {
          throw new Error("Error interno al iniciar sesión.");
        }

        // ✅ Si no fue exitoso
        if (!result.ok) {
          const data = await result.json().catch(() => ({}));
          throw new Error(data?.message || "Credenciales inválidas");
        }

        setTimeout(() => resolve(result), 1000);
      } catch (err) {
        setTimeout(() => reject(err), 1000);
      }
    });

    toast.promise(loginPromise, {
      loading: "Verificando credenciales...",
      success: () => {
        setTimeout(() => {
          window.location.href = "/getarqueo";
        }, 1500);
        return "Inicio de sesión exitoso ✅";
      },
      error: (err: any) => {
        const msg = err?.message ?? "Usuario o contraseña incorrectos.";
        setErrorString(msg);
        setTimeout(() => setErrorString(""), 5000);
        return msg;
      },
      duration: 3000,
    });
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errorString,
    handleSubmit,
  };
}
