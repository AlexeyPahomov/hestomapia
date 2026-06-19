export const WIKIMAPIA_UPSTREAM_URL = 'http://api.wikimapia.org/';

export function buildWikimapiaUpstreamSearchParams(
  searchParams: URLSearchParams,
  apiKey: string,
): URLSearchParams {
  const params = new URLSearchParams();

  searchParams.forEach((value, key) => {
    if (key !== 'key') {
      params.set(key, value);
    }
  });

  params.set('key', apiKey);

  return params;
}

export function buildWikimapiaUpstreamUrl(
  searchParams: URLSearchParams,
  apiKey: string,
): string {
  return `${WIKIMAPIA_UPSTREAM_URL}?${buildWikimapiaUpstreamSearchParams(searchParams, apiKey).toString()}`;
}
