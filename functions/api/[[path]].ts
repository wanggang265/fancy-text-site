// Cloudflare Pages Functions - API proxy to backend Workers
export const onRequest = async (context: { request: Request; env: Record<string, unknown> }) => {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, '');
  const query = url.search;

  const target = `https://removepdfpages-workers.gw471210.workers.dev/api${path}${query}`;

  const headers = new Headers(request.headers);
  headers.set('Host', 'removepdfpages-workers.gw471210.workers.dev');

  try {
    const response = await fetch(target, {
      method: request.method,
      headers,
      body: request.body,
    });

    // Clone response so we can modify headers
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    return newResponse;
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Proxy error', message: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestGet = onRequest;
export const onRequestPost = onRequest;
export const onRequestPut = onRequest;
export const onRequestDelete = onRequest;
export const onRequestOptions = onRequest;
