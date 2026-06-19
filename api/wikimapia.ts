import { buildWikimapiaUpstreamUrl } from '../lib/wikimapia/upstream-url';

export default async function handler(request: Request): Promise<Response> {
  const apiKey = process.env.WIKIMAPIA_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'WIKIMAPIA_API_KEY is not configured' },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const upstream = await fetch(buildWikimapiaUpstreamUrl(searchParams, apiKey));

  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: {
      'Content-Type':
        upstream.headers.get('Content-Type') ?? 'application/json; charset=utf-8',
    },
  });
}
