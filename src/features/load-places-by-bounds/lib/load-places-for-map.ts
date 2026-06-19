import type { GeoJSONSource, Map as MaplibreMap } from 'maplibre-gl';
import { fetchPlacesInBbox, type MapBbox } from '@shared/api/wikimapia';
import { WIKIMAPIA_SOURCE_ID } from '@shared/config/wikimapia';
import { extractPlacesFromResponse, placesToGeoJSON } from '@entities/place';

export async function loadPlacesForMap(
  map: MaplibreMap,
  bbox: MapBbox,
  signal: AbortSignal,
): Promise<void> {
  const response = await fetchPlacesInBbox(bbox, signal);
  const geojson = placesToGeoJSON(extractPlacesFromResponse(response));
  const source = map.getSource(WIKIMAPIA_SOURCE_ID) as GeoJSONSource | undefined;

  source?.setData(geojson);
}
