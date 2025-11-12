// src/components/ClerkWrapper.tsx
import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

interface ClerkWrapperProps {
  children: React.ReactNode;
}

// Obtén la clave pública de tus variables de entorno
const clerkPubKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

const ClerkWrapper: React.FC<ClerkWrapperProps> = ({ children }) => {
  if (!clerkPubKey) {
    throw new Error("Missing PUBLIC_CLERK_PUBLISHABLE_KEY environment variable");
  }
  
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      {children}
    </ClerkProvider>
  );
};

export default ClerkWrapper;
