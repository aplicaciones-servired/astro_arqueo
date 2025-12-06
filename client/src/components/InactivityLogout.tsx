import { useEffect } from 'react';
import { useClerk } from '@clerk/clerk-react';

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutos en milisegundos

export function useInactivityLogout() {
  const { signOut } = useClerk();
  let inactivityTimer: NodeJS.Timeout;

  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(async () => {
      console.log('Sesión cerrada por inactividad');
      await signOut({ redirectUrl: '/' });
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    // Eventos que resetean el timer
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Iniciar timer al cargar
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [signOut]);
}