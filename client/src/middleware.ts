// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

// Cambiar el nombre para que tenga sentido
const isProtectedRoute = createRouteMatcher([
  "/getarqueo(.*)",
  "/cronograma(.*)", 
  "/getcronograma(.*)",
  "/getregistro(.*)",
]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId } = auth();

  // "Si la ruta ES protegida Y NO hay usuario → redirige al login"
  if (isProtectedRoute(context.request) && !userId) {
    return Response.redirect(new URL("/", context.request.url));
  }
});