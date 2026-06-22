import type {
  WikimapiaComment,
  WikimapiaPhoto,
  WikimapiaPlaceByIdResponse,
  WikimapiaPlaceSummary,
  WikimapiaPlacesByAreaResponse,
  WikimapiaRawComment,
  WikimapiaRawPhoto,
  WikimapiaRawPlaceByIdResponse,
  WikimapiaRawPlaceSummary,
} from '@shared/api/wikimapia';

function isActivePhoto(photo: WikimapiaRawPhoto): boolean {
  return photo.status == null || photo.status === 0;
}

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

function pickPhotoUrl(
  photo: WikimapiaRawPhoto,
  ...keys: Array<'big_url' | '960_url' | 'thumbnail_url' | 'full_url'>
): string | undefined {
  for (const key of keys) {
    const value = photo[key]?.trim();

    if (value) {
      return value;
    }
  }

  return undefined;
}

function normalizePhotos(photos: WikimapiaRawPhoto[] = []): WikimapiaPhoto[] {
  return photos.flatMap((photo) => {
    if (!isActivePhoto(photo)) {
      return [];
    }

    const previewUrl = pickPhotoUrl(photo, 'big_url', '960_url', 'thumbnail_url');
    const fullUrl = pickPhotoUrl(photo, 'full_url', 'big_url');

    if (!previewUrl || !fullUrl) {
      return [];
    }

    return [{ id: photo.id, previewUrl, fullUrl }];
  });
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

export function normalizePlaceById(raw: WikimapiaRawPlaceByIdResponse): WikimapiaPlaceByIdResponse {
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
    photos: normalizePhotos(raw.photos),
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
