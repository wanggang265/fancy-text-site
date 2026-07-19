'use client';

import { useState } from 'react';
import { sendMagicLink, getAnonId } from '@/lib/api';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';

export function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      setErrorMsg('Please enter a valid email');
      return;
    }
    setStatus('sending');
    try {
      await sendMagicLink(email);
      setStatus('sent');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send magic link');
    }
  };

  const handleGoogle = async () => {
    // For static export, we use the Google Sign-In button approach
    // The actual Google login is handled via the backend OAuth redirect flow
    // or we can use the Google Identity Services JS library
    // For now, redirect to the backend Google OAuth endpoint
    window.location.href = 'https://removepdfpages-workers.gw471210.workers.dev/api/auth/google';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-950">Sign in</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to save your work and track credits across sessions.
        </p>

        {status === 'sent' ? (
          <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
            Check your email! We sent a magic link to {email}. Click the link to sign in.
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="mt-5 space-y-3">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            {status === 'error' && (
              <p className="text-sm text-red-600">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : 'Send magic link'}
            </button>
          </form>
        )}

        <div className="mt-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-xs text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="mt-4">
          <GoogleSignInButton onSuccess={onClose} />
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Anonymous usage is still available without signing in.
        </p>
      </div>
    </div>
  );
}
