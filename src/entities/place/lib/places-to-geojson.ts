import type { FeatureCollection, Polygon } from 'geojson';
import type { WikimapiaPlaceSummary } from '@shared/api/wikimapia';

function closeRing(coordinates: [number, number][]): [number, number][] {
  if (coordinates.length === 0) {
    return coordinates;
  }

  const [firstLng, firstLat] = coordinates[0];
  const [lastLng, lastLat] = coordinates[coordinates.length - 1];

  if (firstLng === lastLng && firstLat === lastLat) {
    return coordinates;
  }

  return [...coordinates, [firstLng, firstLat]];
}

export function placesToGeoJSON(places: WikimapiaPlaceSummary[]): FeatureCollection<Polygon> {
  return {
    type: 'FeatureCollection',
    features: places
      .filter((place) => place.polygon && place.polygon.length >= 3)
      .map((place) => {
        const ring = closeRing(
          place.polygon!.map((point) => [point.x, point.y] as [number, number]),
        );

        return {
          type: 'Feature' as const,
          properties: {
            id: place.id,
            title: place.title,
          },
          geometry: {
            type: 'Polygon' as const,
            coordinates: [ring],
          },
        };
      }),
  };
}
