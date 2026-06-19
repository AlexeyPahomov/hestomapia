import type { WikimapiaCoordinates } from '@shared/api/wikimapia';

export function formatCoordinates({ lat, lon }: WikimapiaCoordinates): string {
  return `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
}

export function formatCommentDate(timestamp: number): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(timestamp * 1000));
}
