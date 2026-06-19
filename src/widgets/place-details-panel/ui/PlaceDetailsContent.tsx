import type { WikimapiaPlaceDetails } from '@shared/api/wikimapia';
import { formatCoordinates } from '@entities/place';
import { DetailField } from '@shared/ui/detail-field';
import { PlaceCommentList } from './PlaceCommentList';

type PlaceDetailsContentProps = {
  place: WikimapiaPlaceDetails;
};

export function PlaceDetailsContent({ place }: PlaceDetailsContentProps) {
  return (
    <div className="space-y-4">
      {place.coordinates && (
        <DetailField label="Координаты">
          <p className="font-mono text-sm text-gray-700">
            {formatCoordinates(place.coordinates)}
          </p>
        </DetailField>
      )}

      {place.description && (
        <DetailField label="Описание">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
            {place.description}
          </p>
        </DetailField>
      )}

      {place.comments.length > 0 && (
        <DetailField label="Комментарии">
          <PlaceCommentList comments={place.comments} />
        </DetailField>
      )}

      {place.url && (
        <a
          href={place.url}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-sm text-blue-600 hover:underline"
        >
          Открыть на Wikimapia
        </a>
      )}
    </div>
  );
}
