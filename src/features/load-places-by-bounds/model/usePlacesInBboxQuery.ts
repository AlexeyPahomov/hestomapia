import { useQuery } from '@tanstack/react-query';
import type { FeatureCollection, Polygon } from 'geojson';
import { useEffect } from 'react';
import { normalizeBbox } from '@shared/lib/maplibre';
import {
  fetchPlacesGeoJSON,
  getPlacesQueryKey,
  PLACES_QUERY_KEY,
  placesQueryOptions,
  type PlacesQueryParams,
} from '../lib/places-query';

export function usePlacesInBboxQuery(params: PlacesQueryParams | null) {
  const normalizedBbox = params === null ? null : normalizeBbox(params.bbox);
  const isEnabled = params !== null && normalizedBbox !== null;

  const query = useQuery<FeatureCollection<Polygon>>({
    queryKey: isEnabled
      ? getPlacesQueryKey(params.zoom, normalizedBbox)
      : ([PLACES_QUERY_KEY, 'idle'] as const),
    queryFn: ({ signal }) => {
      if (!params) {
        throw new Error('Places query invoked without params');
      }

      return fetchPlacesGeoJSON(params.bbox, signal);
    },
    enabled: isEnabled,
    ...placesQueryOptions,
  });

  useEffect(() => {
    if (query.error) {
      console.error('Failed to load Wikimapia places:', query.error);
    }
  }, [query.error]);

  return query;
}
