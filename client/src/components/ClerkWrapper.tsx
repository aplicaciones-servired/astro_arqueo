// src/components/ClerkWrapper.tsx
import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

interface ClerkWrapperProps {
  children: React.ReactNode;
}

const clerkPubKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

const ClerkWrapper: React.FC<ClerkWrapperProps> = ({ children }) => {
  if (!clerkPubKey) {
    throw new Error("Missing PUBLIC_CLERK_PUBLISHABLE_KEY");
  }

  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      //proxyUrl="https://arqueos.serviredgane.cloud/api/auth"  // ← AÑADE ESTO
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkWrapper;