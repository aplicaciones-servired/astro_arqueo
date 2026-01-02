import { ClerkProvider } from '@clerk/clerk-react';
import { useInactivityLogout } from './InactivityLogout';

function InactivityHandler({ children }: { children: React.ReactNode }) {
  useInactivityLogout();
  return <>{children}</>
}

export default function ClerkWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/"
      signUpUrl="/" // Mismo que sign-in para evitar registro
      afterSignInUrl="/getarqueo"
      afterSignUpUrl="/getarqueo"
      afterSignOutUrl="/" >
      <InactivityHandler>{children}</InactivityHandler>
    </ClerkProvider>
  );
}