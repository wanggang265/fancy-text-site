// API client for removepdfpages backend
// When deployed to Pages with a Functions proxy, use relative path
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export type User = {
  id: number;
  email: string;
  name: string | null;
  avatar: string | null;
  credits: number;
};

export type UsageStats = {
  today: string;
  user: {
    id: number;
    email: string;
    pages_processed: number;
    total_size: number;
    operations: number;
  } | null;
  anonymous: {
    anon_id: string;
    pages_processed: number;
    total_size: number;
    operations: number;
  } | null;
};

// Auth
export async function getMe(): Promise<{ user: User }> {
  return api<{ user: User }>('/api/auth/me');
}

export async function logout(): Promise<{ message: string }> {
  return api<{ message: string }>('/api/auth/logout', { method: 'POST' });
}

export async function sendMagicLink(email: string): Promise<{ message: string }> {
  return api<{ message: string }>('/api/auth/magic-link', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function loginWithGoogle(idToken: string): Promise<{ user: User }> {
  return api<{ user: User }>('/api/auth/google', {
    method: 'POST',
    body: JSON.stringify({ id_token: idToken }),
  });
}

// Usage
export async function getUsage(anonId?: string): Promise<UsageStats> {
  const url = anonId ? `/api/usage?anon_id=${encodeURIComponent(anonId)}` : '/api/usage';
  return api<UsageStats>(url);
}

export async function recordUsage(
  pagesProcessed: number,
  fileSize: number,
  anonId?: string
): Promise<{ message: string; pages: number; size: number }> {
  return api<{ message: string; pages: number; size: number }>('/api/usage', {
    method: 'POST',
    body: JSON.stringify({
      pages_processed: pagesProcessed,
      file_size: fileSize,
      anon_id: anonId || undefined,
    }),
  });
}

// Generate anonymous ID for unauthenticated users
export function getAnonId(): string {
  let id = localStorage.getItem('removepdf_anon_id');
  if (!id) {
    id = 'anon_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('removepdf_anon_id', id);
  }
  return id;
}
