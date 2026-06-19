import type { WikimapiaComment } from '@shared/api/wikimapia';
import { formatCommentDate } from '@entities/place';

type PlaceCommentListProps = {
  comments: WikimapiaComment[];
};

export function PlaceCommentList({ comments }: PlaceCommentListProps) {
  if (comments.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-3">
      {comments.map((comment) => (
        <li key={comment.id} className="rounded-lg bg-gray-50 p-3">
          <p className="text-sm font-medium text-gray-900">{comment.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-700">{comment.message}</p>
          {comment.date != null && (
            <p className="mt-2 text-xs text-gray-400">{formatCommentDate(comment.date)}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
