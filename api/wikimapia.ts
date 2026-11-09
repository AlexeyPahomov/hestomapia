import { buildWikimapiaUpstreamUrl } from '../lib/wikimapia/upstream-url.js';

const UPSTREAM_TIMEOUT_MS = 25_000;

// Данные Wikimapia меняются редко: сутки отдаём из CDN Vercel, неделю — stale с фоновым обновлением.
// Каждый попавший в кэш запрос не расходует лимит ключа.
const CDN_CACHE_CONTROL = 'public, s-maxage=86400, stale-while-revalidate=604800';

// Wikimapia сообщает об ошибках (в т.ч. исчерпанном ключе) в теле ответа `debug` при HTTP 200 —
// такие ответы кэшировать нельзя.
function isCacheableBody(body: string): boolean {
  try {
    const data: unknown = JSON.parse(body);

    return !(typeof data === 'object' && data !== null && 'debug' in data);
  } catch {
    return false;
  }
}

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

    const body = await upstream.text();
    const isCacheable = upstream.ok && isCacheableBody(body);

    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('Content-Type') ?? 'application/json; charset=utf-8',
        'Cache-Control': isCacheable ? CDN_CACHE_CONTROL : 'no-store',
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
