import type {
  WikimapiaComment,
  WikimapiaPlaceByIdResponse,
  WikimapiaPlaceSummary,
  WikimapiaPlacesByAreaResponse,
  WikimapiaRawComment,
  WikimapiaRawLocation,
  WikimapiaRawPlaceSummary,
} from '@shared/api/wikimapia';

type RawPlaceById = WikimapiaPlaceByIdResponse & {
  main?: {
    title?: string;
    description?: string;
    url?: string;
  };
  location?: WikimapiaRawLocation;
  comments?: WikimapiaRawComment[];
};

function normalizeComments(comments: WikimapiaRawComment[] = []): WikimapiaComment[] {
  return comments
    .filter((comment) => !comment.is_deleted && comment.message.trim())
    .map((comment, index) => ({
      id: String(comment.num ?? `${comment.name}-${comment.date ?? index}`),
      name: comment.name,
      message: comment.message,
      date: comment.date,
    }));
}

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
  const location = raw.location;

  return {
    id: raw.id,
    title: raw.title ?? raw.main?.title ?? '',
    description: raw.description ?? raw.main?.description,
    url: raw.url ?? raw.main?.url,
    coordinates:
      location?.lat != null && location?.lon != null
        ? { lat: location.lat, lon: location.lon }
        : undefined,
    comments: normalizeComments(raw.comments),
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
