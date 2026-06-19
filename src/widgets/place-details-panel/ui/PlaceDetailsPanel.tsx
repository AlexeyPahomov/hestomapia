import type { ReactNode } from 'react';
import type { WikimapiaPlaceDetails } from '@shared/api/wikimapia';

type PlaceDetailsPanelProps = {
  place: WikimapiaPlaceDetails | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
};

type DetailFieldProps = {
  label: string;
  children: ReactNode;
};

function DetailField({ label, children }: DetailFieldProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      {children}
    </div>
  );
}

export function PlaceDetailsPanel({
  place,
  isLoading,
  error,
  onClose,
}: PlaceDetailsPanelProps) {
  if (!place && !isLoading && !error) {
    return null;
  }

  return (
    <aside className="flex w-96 shrink-0 flex-col border-l border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">Объект</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded px-2 py-1 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          Закрыть
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isLoading && <p className="text-sm text-gray-500">Загрузка…</p>}

        {error && <p className="text-sm text-red-600">{error}</p>}

        {place && (
          <div className="space-y-4">
            <DetailField label="ID">
              <p className="text-sm text-gray-700">{place.id}</p>
            </DetailField>

            <DetailField label="Название">
              <p className="text-base font-medium text-gray-900">{place.title}</p>
            </DetailField>

            {place.description && (
              <DetailField label="Описание">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                  {place.description}
                </p>
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
        )}
      </div>
    </aside>
  );
}
