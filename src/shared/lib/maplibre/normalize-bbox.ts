import type { MapBbox } from '@shared/api/wikimapia';

const BBOX_KEY_PRECISION = 2;

export function normalizeBbox(bbox: MapBbox): MapBbox {
  return {
    west: Number(bbox.west.toFixed(BBOX_KEY_PRECISION)),
    south: Number(bbox.south.toFixed(BBOX_KEY_PRECISION)),
    east: Number(bbox.east.toFixed(BBOX_KEY_PRECISION)),
    north: Number(bbox.north.toFixed(BBOX_KEY_PRECISION)),
  };
}
