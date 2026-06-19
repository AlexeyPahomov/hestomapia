import type { MapBbox } from './types';

export function formatBbox(bbox: MapBbox): string {
  return `${bbox.west},${bbox.south},${bbox.east},${bbox.north}`;
}
