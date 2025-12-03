// src/middleware.mjs
import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/astro/server";

// Rutas protegidas del FRONTEND
const isProtectedRoute = createRouteMatcher([
  "/getarqueo(.*)",
  "/cronograma(.*)",
  "/getcronograma(.*)",
  "/getregistro(.*)",
  "/informe(.*)",
  "/api(.*)",
]);

// Página de login
const isLoginPage = createRouteMatcher(["/"]);

export const onRequest = clerkMiddleware(
  async (auth, context, next) => {
    const { userId, redirectToSignIn, sessionId } = auth();
    const url = new URL(context.request.url);
    const pathname = url.pathname;

    // ⛔ Si es API y NO hay sesión → devolver 401 (no redirigir)
    if (!userId && pathname.startsWith("/api/")) {
      return new Response("Unauthorized", { status: 401 });
    }

    // ⛔ Si es página protegida y NO hay sesión → redirigir a login
    if (!userId && isProtectedRoute(context.request)) {
      return redirectToSignIn({ returnBackUrl: url.href });
    }
    // 🎯 Obtener usuario y rol cuando está autenticado
    let user = null;
    let role = null;

    if (userId) {
      user = await clerkClient(context).users.getUser(userId);
      role = user.privateMetadata.role;
    }

    // 🚫 Usuario con sesión pero SIN permisos → enviar a expulsión
    if (
      userId &&
      isProtectedRoute(context.request) &&
      role !== "admin" &&
      role !== "auditoria"
    ) {
      clerkClient(context).sessions.revokeSession(sessionId);
      return Response.redirect(`${url.origin}/unauthorized`, 302);
    }

    // Si el usuario ya está logueado y va al login → redirigir
    if (userId && isLoginPage(context.request)) {
      return Response.redirect(`${url.origin}/getarqueo`, 302);
    }

    const response = await next();

    // Evitar cache en rutas sensibles
    if (isProtectedRoute(context.request) || isLoginPage(context.request)) {
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
    }

    return response;
  },
  {
    authorizedParties: [
      "https://arqueos.serviredgane.cloud",
      "http://localhost:4321",
      "http://localhost:3000",
      "http://localhost:4322", // 👈 agrega este
    ],
  }
);
