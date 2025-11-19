// src/components/ClerkWrapper.tsx
import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

interface ClerkWrapperProps {
  children: React.ReactNode;
}

// ✅ CORRECTO: Usar PUBLISHABLE_KEY para publishableKey
const clerkPubKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

const ClerkWrapper: React.FC<ClerkWrapperProps> = ({ children }) => {
  if (!clerkPubKey) {
    throw new Error("Missing PUBLIC_CLERK_PUBLISHABLE_KEY");
  }

  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      // ✅ OPCIONAL: Si necesitas configurar el proxy en el cliente también
      clerkJSUrl={import.meta.env.PUBLIC_CLERK_PROXY_URL}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkWrapper;