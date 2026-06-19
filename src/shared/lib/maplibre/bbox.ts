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

export function bboxToKey(bbox: MapBbox): string {
  return [bbox.west, bbox.south, bbox.east, bbox.north]
    .map((value) => value.toFixed(5))
    .join(',');
}
