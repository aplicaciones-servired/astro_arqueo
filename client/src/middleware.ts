// src/middleware.mjs
import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher([
  "/getarqueo(.*)",
  "/cronograma(.*)", 
  "/getcronograma(.*)",
  "/getregistro(.*)",
  "/api(.*)",         // 👈 API protegida también
]);

const isLoginPage = createRouteMatcher(["/"]);

export const onRequest = clerkMiddleware(async (auth, context, next) => {
  const { userId, redirectToSignIn } = auth();
  const url = new URL(context.request.url);

  // 🔐 Si no está autenticado y ruta es protegida → login
  if (!userId && isProtectedRoute(context.request)) {
    return redirectToSignIn({ returnBackUrl: url.href });
  }

  // Si está autenticado y va al login → redirigir
  if (userId && isLoginPage(context.request)) {
    return Response.redirect(`${url.origin}/getarqueo`, 302);
  }

  const response = await next();

  // No-cache para rutas seguras
  if (isProtectedRoute(context.request) || isLoginPage(context.request)) {
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}, {
  authorizedParties: [
    "https://arqueos.serviredgane.cloud",
    "http://localhost:4321"
  ],
});
