import type { WikimapiaPlaceDetails } from '@shared/api/wikimapia';
import { CloseIcon } from '@shared/ui/icon';
import { PlaceDetailsContent } from './PlaceDetailsContent';

type PlaceDetailsPanelProps = {
  place: WikimapiaPlaceDetails | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
};

const backdropClassName =
  'animate-place-backdrop-enter motion-reduce:animate-none fixed inset-0 z-40 cursor-pointer bg-black/40 md:hidden';

const panelClassName =
  'animate-place-panel-enter md:animate-place-panel-enter-desktop motion-reduce:animate-none fixed inset-x-0 bottom-0 z-50 flex max-h-[min(85vh,100%)] flex-col rounded-t-2xl border-t border-gray-200 bg-white shadow-2xl md:inset-x-auto md:inset-y-0 md:right-0 md:bottom-auto md:left-auto md:h-full md:max-h-none md:w-96 md:rounded-none md:border-l md:border-t-0';

export function PlaceDetailsPanel({
  place,
  isLoading,
  error,
  onClose,
}: PlaceDetailsPanelProps) {
  if (!place && !isLoading && !error) {
    return null;
  }

  const title = place?.title || 'Загрузка…';

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть карточку объекта"
        className={backdropClassName}
      />

      <aside
        className={panelClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby="place-details-title"
      >
        <div className="flex justify-center pt-2 md:hidden">
          <span className="h-1 w-10 rounded-full bg-gray-300" aria-hidden="true" />
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3">
          <h2
            id="place-details-title"
            className="line-clamp-2 min-w-0 flex-1 text-base font-semibold text-gray-900"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="shrink-0 cursor-pointer rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {isLoading && (
            <p className="text-sm text-gray-500" aria-live="polite">
              Загрузка…
            </p>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          {place && !isLoading && <PlaceDetailsContent place={place} />}
        </div>
      </aside>
    </>
  );
}
