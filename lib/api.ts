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

export type QuotaStatus = {
  plan: 'free' | 'monthly' | 'yearly' | 'onetime';
  free_conversions_used: number;
  free_conversions_limit: number;
  free_conversions_reset_at?: string;
  included_conversions_used: number;
  included_conversions_limit: number;
  included_conversions_reset_at?: string;
  credits_balance: number;
  is_cancelled: boolean;
};

export type QuotaResponse = {
  user: Omit<User, 'credits'> | null;
  anon_id: string;
  quota: QuotaStatus;
};

export type ConvertToWordResponse = {
  ok: boolean;
  download_url?: string;
  file_name?: string;
  output_format?: string;
  expires_at?: string;
  quota?: QuotaStatus;
  errorCode?: string;
  message?: string;
};

// Auth
export async function getMe(): Promise<{ user: User }> {
  return api<{ user: User }>('/auth/me');
}

export async function logout(): Promise<{ message: string }> {
  return api<{ message: string }>('/auth/logout', { method: 'POST' });
}

export async function sendMagicLink(email: string): Promise<{ message: string }> {
  return api<{ message: string }>('/auth/magic-link', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function loginWithGoogle(idToken: string): Promise<{ user: User }> {
  return api<{ user: User }>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ id_token: idToken }),
  });
}

// Usage
export async function getUsage(anonId?: string): Promise<UsageStats> {
  const url = anonId ? `/usage?anon_id=${encodeURIComponent(anonId)}` : '/usage';
  return api<UsageStats>(url);
}

export async function recordUsage(
  pagesProcessed: number,
  fileSize: number,
  anonId?: string
): Promise<{ message: string; pages: number; size: number }> {
  return api<{ message: string; pages: number; size: number }>('/usage', {
    method: 'POST',
    body: JSON.stringify({
      pages_processed: pagesProcessed,
      file_size: fileSize,
      anon_id: anonId || undefined,
    }),
  });
}

export async function getQuota(anonId?: string): Promise<QuotaResponse> {
  const url = anonId ? `/usage/quota?anon_id=${encodeURIComponent(anonId)}` : '/usage/quota';
  return api<QuotaResponse>(url, {
    headers: anonId ? { 'x-anon-id': anonId } : undefined,
  });
}

export async function convertToWord(
  file: File,
  outputFormat: 'docx' | 'rtf' = 'docx',
  anonId?: string
): Promise<ConvertToWordResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('output_format', outputFormat);

  const headers: Record<string, string> = {};
  if (anonId) headers['x-anon-id'] = anonId;

  const res = await fetch(`${API_BASE}/pdf/convert-to-word`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: formData,
  });

  const data = (await res.json().catch(() => ({}))) as ConvertToWordResponse;
  if (!res.ok) {
    const err = new Error(data.message || `HTTP ${res.status}`) as Error & { code?: string };
    err.code = data.errorCode || `HTTP_${res.status}`;
    throw err;
  }
  return data;
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

export function emitCreditsRefresh(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('removepdf:credits:refresh'));
  }
}
