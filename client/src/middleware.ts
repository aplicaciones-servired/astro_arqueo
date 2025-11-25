// src/middleware.mjs
import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

// Rutas protegidas del FRONTEND (NO API)
const isProtectedRoute = createRouteMatcher([
  "/getarqueo(.*)",
  "/cronograma(.*)", 
  "/getcronograma(.*)",
  "/getregistro(.*)",
]);

// Página de login (raíz)
const isLoginPage = createRouteMatcher(["/"]);

export const onRequest = clerkMiddleware(async (auth, context, next) => {
  const { userId, redirectToSignIn } = auth();
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // --- ⛔ EXCLUIR COMPLETAMENTE API del middleware ---
  if (pathname.startsWith("/api/") || pathname === "/api") {
    return next(); // dejar pasar sin Clerk
  }

  if (!userId && isProtectedRoute(context.request)) {
    return redirectToSignIn({ returnBackUrl: url.href });
  }

  if (userId && isLoginPage(context.request)) {
    return Response.redirect(`${url.origin}/getarqueo`, 302);
  }

  const response = await next();

  if (isProtectedRoute(context.request) || isLoginPage(context.request)) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}, {
  authorizedParties: [
    "https://arqueos.serviredgane.cloud",
    "http://localhost:4321",
    "http://localhost:3000"
  ],
});