import { useQuery } from '@tanstack/react-query';
import type { FeatureCollection, Polygon } from 'geojson';
import { normalizeBbox } from '@shared/lib/maplibre';
import {
  fetchPlacesGeoJSON,
  getPlacesQueryKey,
  PLACES_QUERY_KEY,
  placesQueryOptions,
  type PlacesQueryParams,
} from '../lib/places-query';
import { usePlacesLoadError, useQuotaBlockState } from './usePlacesLoadError';

export function usePlacesInBboxQuery(params: PlacesQueryParams | null) {
  const { isQuotaBlocked, blockQuota } = useQuotaBlockState();

  const bbox = params?.bbox;
  const zoom = params?.zoom;
  const normalizedBbox = bbox ? normalizeBbox(bbox) : null;
  const canQuery = bbox !== undefined && zoom !== undefined && normalizedBbox !== null;

  const { data: placesGeoJSON, error } = useQuery<FeatureCollection<Polygon>>({
    queryKey: canQuery
      ? getPlacesQueryKey(zoom, normalizedBbox)
      : ([PLACES_QUERY_KEY, 'idle'] as const),
    queryFn: ({ signal }) => {
      if (!bbox) {
        throw new Error('Places query invoked without bbox');
      }

      return fetchPlacesGeoJSON(bbox, signal);
    },
    enabled: canQuery && !isQuotaBlocked,
    ...placesQueryOptions,
  });

  const loadError = usePlacesLoadError(error, blockQuota);

  return {
    placesGeoJSON,
    loadError,
    isQuotaBlocked,
  };
}
