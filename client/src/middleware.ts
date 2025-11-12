// src/middleware.mjs
import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

// Define qué rutas deben estar protegidas y sin caché
const isProtectedRoute = createRouteMatcher([
  "/getarqueo(.*)",
  "/cronograma(.*)",
  "/getcronograma(.*)",
  "/getregistro(.*)",
  "/api(.*)",
]);

const isLoginPage = createRouteMatcher(["/"]);

export const onRequest = clerkMiddleware(async (auth, context, next) => {
  // <-- 1. Añade 'async' aquí
  const { userId, redirectToSignIn } = auth();
  const url = new URL(context.request.url);

  // --- Lógica de autenticación ---

  // Si el usuario no está autenticado y trata de acceder a una ruta protegida
  if (!userId && isProtectedRoute(context.request)) {
    return redirectToSignIn({ returnBackUrl: url.href });
  }

  // Si el usuario está autenticado y trata de acceder al login, redirigir a getarqueo
  if (userId && isLoginPage(context.request)) {
    return Response.redirect(`${url.origin}/getarqueo`, 302);
  }

  // Redirigir raíz (/)
  if (url.pathname === "/") {
    if (userId) {
      return Response.redirect(`${url.origin}/getarqueo`, 302);
    } else {
      return Response.redirect(`${url.origin}/`, 302);
    }
  }

  // --- Manejo de la caché ---

  // 2. Usa 'await' para obtener la respuesta real de la promesa
  const response = await next();

  // Si la ruta actual es una página protegida o la página de login,
  // añade cabeceras para prevenir la caché del navegador.
  if (isProtectedRoute(context.request) || isLoginPage(context.request)) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  // Devuelve la respuesta modificada
  return response;
});
