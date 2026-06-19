import type { MapBbox } from '@shared/api/wikimapia';

export const DEFAULT_MAP_BBOX = {
  west: 36.76923501896488,
  south: 55.399028877847314,
  east: 36.82965982365204,
  north: 55.427433862340195,
} satisfies MapBbox;

export const DEFAULT_MAP_BOUNDS: [[number, number], [number, number]] = [
  [DEFAULT_MAP_BBOX.west, DEFAULT_MAP_BBOX.south],
  [DEFAULT_MAP_BBOX.east, DEFAULT_MAP_BBOX.north],
];

export const DEFAULT_MAP_ZOOM = 14;
export const DEFAULT_FIT_BOUNDS_PADDING = 24;
