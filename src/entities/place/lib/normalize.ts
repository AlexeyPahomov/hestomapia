import type {
  WikimapiaPlaceByIdResponse,
  WikimapiaPlaceSummary,
  WikimapiaPlacesByAreaResponse,
  WikimapiaRawPlaceSummary,
} from '@shared/api/wikimapia';

type RawPlaceById = WikimapiaPlaceByIdResponse & {
  main?: {
    title?: string;
    description?: string;
    url?: string;
  };
};

function normalizePlaceSummary(place: WikimapiaRawPlaceSummary): WikimapiaPlaceSummary | null {
  const id = Number(place.id);

  if (Number.isNaN(id)) {
    return null;
  }

  return {
    id,
    title: place.title ?? place.name ?? '',
    url: place.url,
    polygon: place.polygon ?? place.location?.polygon,
  };
}

export function normalizePlaceById(raw: RawPlaceById): WikimapiaPlaceByIdResponse {
  return {
    id: raw.id,
    title: raw.title ?? raw.main?.title ?? '',
    description: raw.description ?? raw.main?.description,
    url: raw.url ?? raw.main?.url,
  };
}

export function extractPlacesFromResponse(
  response: WikimapiaPlacesByAreaResponse,
): WikimapiaPlaceSummary[] {
  const places = response.places ?? response.folder ?? [];

  return places
    .map(normalizePlaceSummary)
    .filter((place): place is WikimapiaPlaceSummary => place !== null);
}
