import {
  PLACES_PER_PAGE,
  WIKIMAPIA_API_BASE,
  WIKIMAPIA_BOX_FUNCTION,
} from '@shared/config/wikimapia';
import { formatBbox } from './format-bbox';
import { parseWikimapiaResponse } from './parse-response';
import type {
  MapBbox,
  WikimapiaPlaceByIdResponse,
  WikimapiaPlacesByAreaResponse,
} from './types';

const API_KEY = import.meta.env.VITE_WIKIMAPIA_API_KEY;

type RequestParams = Record<string, string | number>;

function buildUrl(params: RequestParams): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    searchParams.set(key, String(value));
  }

  return `${WIKIMAPIA_API_BASE}/?${searchParams.toString()}`;
}

async function request<T>(params: RequestParams, signal?: AbortSignal): Promise<T> {
  if (!API_KEY) {
    throw new Error('VITE_WIKIMAPIA_API_KEY не задан в .env');
  }

  const response = await fetch(buildUrl({ key: API_KEY, ...params }), { signal });

  if (!response.ok) {
    throw new Error(`Wikimapia API error: ${response.status}`);
  }

  return parseWikimapiaResponse<T>(await response.json());
}

export async function fetchPlacesInBbox(
  bbox: MapBbox,
  signal?: AbortSignal,
): Promise<WikimapiaPlacesByAreaResponse> {
  return request<WikimapiaPlacesByAreaResponse>(
    {
      function: WIKIMAPIA_BOX_FUNCTION,
      format: 'json',
      language: 'ru',
      bbox: formatBbox(bbox),
      count: PLACES_PER_PAGE,
      page: 1,
    },
    signal,
  );
}

export async function fetchPlaceById(
  id: number,
  signal?: AbortSignal,
): Promise<WikimapiaPlaceByIdResponse> {
  return request<WikimapiaPlaceByIdResponse>(
    {
      function: 'place.getbyid',
      format: 'json',
      language: 'ru',
      data_blocks: 'main',
      id,
    },
    signal,
  );
}
