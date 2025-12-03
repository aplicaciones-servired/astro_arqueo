import { useEffect } from "react";
import { $clerkStore } from "@clerk/astro/client";
import { useStore } from "@nanostores/react";
import { SignedIn, SignedOut } from "@clerk/astro/react";

export default function AutoLogout() {
  const clerk = useStore($clerkStore);

  return (
    <>
      <p> </p>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">⛔Acceso no autorizado</h1>
          <p className="text-gray-600">
            ⛔Acceso no autorizado — cerrando sesión...
          </p>
          <a
            href="/"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Ir al Login
          </a>
        </div>
      </div>
    </>
  );
}
