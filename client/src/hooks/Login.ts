import { useState } from "react";
import { toast } from "sonner";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorString, setErrorString] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setErrorString("");

    try {
      // 1️⃣ Validar con tu backend
      const res = await fetch(`http://localhost:9010/api/v2/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();
      if (!res.ok || !text.includes("Login successful")) {
        throw new Error("Credenciales inválidas");
      }

      // 2️⃣ Crear sesión Clerk
      const clerkRes = await fetch("/api/clerk-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        credentials: "include",
      });

      if (!clerkRes.ok) {
        const errData = await clerkRes.json();
        throw new Error(errData.error || "Error creando sesión Clerk");
      }

      toast.success("Inicio de sesión exitoso ✅");

      // 3️⃣ Redirigir
      setTimeout(() => window.location.assign("/getarqueo"), 500);
    } catch (err: any) {
      setErrorString(err?.message ?? "Error al iniciar sesión");
      toast.error(err?.message ?? "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return { username, setUsername, password, setPassword, errorString, isLoading, handleSubmit };
}
