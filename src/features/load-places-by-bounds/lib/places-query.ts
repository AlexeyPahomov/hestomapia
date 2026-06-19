import { fetchPlacesInBbox, shouldRetryWikimapiaRequest, type MapBbox } from '@shared/api/wikimapia';
import { extractPlacesFromResponse, placesToGeoJSON } from '@entities/place';

export const PLACES_QUERY_KEY = 'places';

export const placesQueryOptions = {
  staleTime: 15 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  retry: shouldRetryWikimapiaRequest,
};

export type PlacesQueryParams = {
  bbox: MapBbox;
  zoom: number;
};

export function getPlacesQueryKey(zoom: number, normalizedBbox: MapBbox) {
  return [PLACES_QUERY_KEY, zoom, normalizedBbox] as const;
}

export async function fetchPlacesGeoJSON(bbox: MapBbox, signal: AbortSignal) {
  const response = await fetchPlacesInBbox(bbox, signal);

  return placesToGeoJSON(extractPlacesFromResponse(response));
}
