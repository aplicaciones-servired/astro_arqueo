// hooks/useLogin.ts
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
        console.log('🔐 Validando credenciales con backend...');
        
        // 1. Primero validar con tu backend tradicional
        const res = await fetch(`http://localhost:9010/api/v2/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const text = await res.text();
        console.log('📋 Respuesta del backend:', text);

        if (!res.ok || !text.includes("Login successful")) {
          throw new Error("Credenciales inválidas");
        }

        console.log('✅ Autenticación tradicional exitosa');

        // 2. Crear sesión en Clerk SOLO con el username
        const clerkRes = await fetch("/api/clerk-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }), // Solo username, sin password
        });

        const clerkData = await clerkRes.json();
        console.log('📋 Respuesta de Clerk:', clerkData);

        if (!clerkRes.ok) {
          throw new Error(clerkData.error || "Error creando sesión Clerk");
        }

        console.log('✅ Sesión Clerk creada exitosamente');
        resolve(clerkRes);
        
      } catch (err: any) {
        console.error('❌ Error en el proceso de login:', err);
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