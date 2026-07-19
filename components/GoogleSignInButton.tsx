'use client';

import { useEffect, useRef } from 'react';
import { loginWithGoogle } from '@/lib/api';

// Google Identity Services sign-in button
// Requires <script src="https://accounts.google.com/gsi/client" async defer></script> in layout

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
        };
      };
    };
  }
}

export function GoogleSignInButton({ onSuccess }: { onSuccess?: () => void }) {
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!btnRef.current || !window.google) return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      // Fallback: render a simple button that redirects to backend OAuth flow
      // This requires a backend GET /api/auth/google endpoint for redirect
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: { credential: string }) => {
        try {
          await loginWithGoogle(response.credential);
          onSuccess?.();
          window.location.reload();
        } catch (err) {
          console.error('Google login failed:', err);
        }
      },
    });

    window.google.accounts.id.renderButton(btnRef.current, {
      type: 'standard',
      size: 'large',
      width: '100%',
      text: 'continue_with',
      shape: 'pill',
    });
  }, [onSuccess]);

  return <div ref={btnRef} className="w-full" />;
}
