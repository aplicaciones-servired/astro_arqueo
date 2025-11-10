// src/components/ClerkDebug.tsx
'use client';

import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/astro/react";

export default function ClerkDebug() {
  const [cookies, setCookies] = useState('');
  const [localStorageData, setLocalStorageData] = useState('');

  useEffect(() => {
    setCookies(document.cookie);
    
    // Verificar datos en localStorage/sessionStorage - CORREGIDO
    const lsData: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        lsData[key] = localStorage.getItem(key) || '';
      }
    }
    setLocalStorageData(JSON.stringify(lsData, null, 2));
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      left: '10px', 
      background: 'white', 
      padding: '10px', 
      border: '1px solid #ccc', 
      zIndex: 1000, 
      fontSize: '10px',
      maxWidth: '500px',
      maxHeight: '300px',
      overflow: 'auto'
    }}>
      <h4>🔍 Clerk Debug:</h4>
      
      <div style={{ margin: '5px 0' }}>
        <strong>Auth State:</strong>
        <SignedIn>
          <span style={{ color: 'green' }}> ✅ SIGNED IN</span>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <span style={{ color: 'red' }}> ❌ SIGNED OUT</span>
        </SignedOut>
      </div>
      
      <div style={{ margin: '5px 0' }}>
        <strong>Cookies:</strong>
        <pre>{cookies}</pre>
      </div>
      
      <div style={{ margin: '5px 0' }}>
        <strong>LocalStorage:</strong>
        <pre>{localStorageData}</pre>
      </div>
      
      <button 
        onClick={() => window.location.reload()}
        style={{ margin: '5px 0', padding: '2px 5px' }}
      >
        Refresh
      </button>
    </div>
  );
}