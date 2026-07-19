'use client';

import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/lib/api';
import { getMe, logout } from '@/lib/api';

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

export function useAuth() {
  const [state, setState] = useState<AuthState>({ user: null, loading: true, error: null });

  const refresh = useCallback(async () => {
    try {
      const data = await getMe();
      setState({ user: data.user, loading: false, error: null });
    } catch (err: any) {
      // 401 means not logged in, which is fine
      if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
        setState({ user: null, loading: false, error: null });
      } else {
        setState({ user: null, loading: false, error: err.message || 'Failed to fetch user' });
      }
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const signOut = useCallback(async () => {
    await logout();
    setState({ user: null, loading: false, error: null });
    window.location.reload();
  }, []);

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    refresh,
    signOut,
    isLoggedIn: !!state.user,
  };
}
