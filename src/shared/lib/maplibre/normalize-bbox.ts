import type { MapBbox } from '@shared/api/wikimapia';

const BBOX_KEY_PRECISION = 2;
const BBOX_KEY_FACTOR = 10 ** BBOX_KEY_PRECISION;

const roundDown = (value: number) =>
  Number((Math.floor(value * BBOX_KEY_FACTOR) / BBOX_KEY_FACTOR).toFixed(BBOX_KEY_PRECISION));
const roundUp = (value: number) =>
  Number((Math.ceil(value * BBOX_KEY_FACTOR) / BBOX_KEY_FACTOR).toFixed(BBOX_KEY_PRECISION));

// Расширяем bbox наружу до сетки: одинаковый URL для соседних позиций карты
// (попадание в CDN-кэш прокси) без потери объектов по краям.
export function normalizeBbox(bbox: MapBbox): MapBbox {
  return {
    west: roundDown(bbox.west),
    south: roundDown(bbox.south),
    east: roundUp(bbox.east),
    north: roundUp(bbox.north),
  };
}
