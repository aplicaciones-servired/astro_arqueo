import { useState } from "react";
import { toast } from "sonner";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorString, setErrorString] = useState("");

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const loginPromise = new Promise(async (resolve, reject) => {
      try {
        // 1. Validar con backend tradicional
        const res = await fetch(`http://localhost:9010/api/v2/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const text = await res.text();
        console.log('📋 Respuesta backend:', text);

        if (!res.ok || !text.includes("Login successful")) {
          throw new Error("Credenciales inválidas");
        }

        // 2. Crear sesión Clerk
        const clerkRes = await fetch("/api/clerk-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });

        const clerkData = await clerkRes.json();
        
        if (!clerkRes.ok) {
          throw new Error(clerkData.error || "Error sesión Clerk");
        }

        resolve(clerkRes);
        
      } catch (err: any) {
        console.error('❌ Error login:', err);
        reject(err);
      }
    });

    toast.promise(loginPromise, {
      loading: "Verificando credenciales...",
      success: () => {
        setTimeout(() => {
          window.location.href = "/getarqueo";
        }, 1000);
        return "Inicio de sesión exitoso ✅";
      },
      error: (err: any) => {
        const msg = err?.message ?? "Error al iniciar sesión.";
        setErrorString(msg);
        setTimeout(() => setErrorString(""), 4000);
        return msg;
      },
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