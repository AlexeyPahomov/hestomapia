import type { Map as MaplibreMap } from 'maplibre-gl';
import {
  PLACES_FILL_LAYER_ID,
  PLACES_LAYER_PAINT,
  PLACES_LINE_LAYER_ID,
  WIKIMAPIA_SOURCE_ID,
} from '@shared/config/wikimapia';

const EMPTY_GEOJSON = {
  type: 'FeatureCollection' as const,
  features: [],
};

export function ensurePlacesLayers(map: MaplibreMap) {
  if (!map.getSource(WIKIMAPIA_SOURCE_ID)) {
    map.addSource(WIKIMAPIA_SOURCE_ID, {
      type: 'geojson',
      data: EMPTY_GEOJSON,
    });
  }

  if (!map.getLayer(PLACES_FILL_LAYER_ID)) {
    map.addLayer({
      id: PLACES_FILL_LAYER_ID,
      type: 'fill',
      source: WIKIMAPIA_SOURCE_ID,
      paint: {
        'fill-color': PLACES_LAYER_PAINT.fillColor,
        'fill-opacity': PLACES_LAYER_PAINT.fillOpacity,
      },
    });
  }

  if (!map.getLayer(PLACES_LINE_LAYER_ID)) {
    map.addLayer({
      id: PLACES_LINE_LAYER_ID,
      type: 'line',
      source: WIKIMAPIA_SOURCE_ID,
      paint: {
        'line-color': PLACES_LAYER_PAINT.lineColor,
        'line-width': PLACES_LAYER_PAINT.lineWidth,
      },
    });
  }
}

export function hasPlacesSource(map: MaplibreMap): boolean {
  return Boolean(map.getSource(WIKIMAPIA_SOURCE_ID));
}
