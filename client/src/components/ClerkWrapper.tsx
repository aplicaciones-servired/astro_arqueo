import { ClerkProvider } from '@clerk/clerk-react';
import { useInactivityLogout } from './InactivityLogout';

function InactivityHandler({ children }: { children: React.ReactNode }) {
  useInactivityLogout();
  return <>{children}</>
}

export default function ClerkWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <InactivityHandler>{children}</InactivityHandler>
    </ClerkProvider>
  );
}