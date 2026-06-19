import type { GeoJSONSource, Map as MaplibreMap } from 'maplibre-gl';
import { fetchPlacesInBbox } from '@shared/api/wikimapia';
import { WIKIMAPIA_SOURCE_ID } from '@shared/config/wikimapia';
import { getBboxFromMap } from '@shared/lib/maplibre/bbox';
import { extractPlacesFromResponse, placesToGeoJSON } from '@entities/place';

export async function loadPlacesForMap(
  map: MaplibreMap,
  signal: AbortSignal,
): Promise<void> {
  const response = await fetchPlacesInBbox(getBboxFromMap(map), signal);
  const geojson = placesToGeoJSON(extractPlacesFromResponse(response));
  const source = map.getSource(WIKIMAPIA_SOURCE_ID) as GeoJSONSource | undefined;

  source?.setData(geojson);
}
