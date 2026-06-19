import type { Map as MaplibreMap } from 'maplibre-gl';
import type { MapBbox } from '@shared/api/wikimapia';

export function getBboxFromMap(map: MaplibreMap): MapBbox {
  const bounds = map.getBounds();

  return {
    west: bounds.getWest(),
    south: bounds.getSouth(),
    east: bounds.getEast(),
    north: bounds.getNorth(),
  };
}

