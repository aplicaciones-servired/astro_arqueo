// src/pages/api/clerk-session.ts
import type { APIRoute } from 'astro';
import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({ secretKey: import.meta.env.CLERK_SECRET_KEY });

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username } = await request.json();
    console.log('📦 Body recibido en /api/clerk-session:', { username });

    let user;
    
    // Buscar usuario por username
    try {
      const users = await clerk.users.getUserList({ 
        username: [username] 
      });
      user = users.data[0];
      console.log('✅ Usuario encontrado en Clerk:', user?.id);
    } catch (error) {
      console.log('🔍 Buscando usuario en Clerk...');
    }

    // Si el usuario no existe, crearlo SIN contraseña
    if (!user) {
      console.log('🆕 Creando nuevo usuario en Clerk...');
      user = await clerk.users.createUser({
        username: username,
        skipPasswordRequirement: true, // Usuario sin contraseña
      });
      console.log('✅ Usuario creado en Clerk:', user.id);
    }

    // Crear sesión para el usuario
    const session = await clerk.sessions.createSession({
      userId: user.id,
    });

    console.log('✅ Sesión creada exitosamente:', session.id);

    return new Response(JSON.stringify({ 
      success: true, 
      sessionId: session.id,
      userId: user.id,
      message: 'Sesión creada correctamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('❌ Error en /api/clerk-session:', error);
    
    let errorMessage = 'Error interno del servidor';
    if (error.status === 422) {
      errorMessage = 'No se pudo crear la sesión. Contacta al administrador.';
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage,
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};