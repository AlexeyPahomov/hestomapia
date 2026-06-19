import { buildWikimapiaUpstreamUrl } from '../lib/wikimapia/upstream-url.js';

const UPSTREAM_TIMEOUT_MS = 25_000;

async function proxyRequest(request: Request): Promise<Response> {
  const apiKey = process.env.WIKIMAPIA_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'WIKIMAPIA_API_KEY is not configured' },
      { status: 500 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const upstream = await fetch(buildWikimapiaUpstreamUrl(searchParams, apiKey), {
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('Content-Type') ?? 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Wikimapia proxy failed:', error);

    return Response.json({ error: 'Failed to reach Wikimapia API' }, { status: 502 });
  }
}

export const GET = proxyRequest;

export default {
  fetch: proxyRequest,
};
