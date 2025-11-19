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

  // --- Manejo de la caché ---

  // Usa 'await' para obtener la respuesta real de la promesa
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
}, {
  authorizedParties: [
    'https://arqueos.serviredgane.cloud',
    'http://localhost:4321'  // tu dominio real del frontend
  ],
});