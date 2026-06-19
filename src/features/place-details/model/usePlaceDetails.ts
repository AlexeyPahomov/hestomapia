import { useCallback, useState } from 'react';
import { fetchPlaceById, getWikimapiaUserMessage } from '@shared/api/wikimapia';
import type { WikimapiaPlaceDetails } from '@shared/api/wikimapia';
import { normalizePlaceById } from '@entities/place';
import { isAbortError, useAbortControllerRef } from '@shared/lib/async';

export function usePlaceDetails() {
  const [selectedPlace, setSelectedPlace] = useState<WikimapiaPlaceDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { create: createAbortController, abort: abortRequest } =
    useAbortControllerRef();

  const selectPlace = useCallback(
    async (id: number, title: string) => {
      const abortController = createAbortController();

      setSelectedPlace({ id, title, comments: [] });
      setIsLoading(true);
      setError(null);

      try {
        const place = normalizePlaceById(
          await fetchPlaceById(id, abortController.signal),
        );

        setSelectedPlace({
          ...place,
          title: place.title || title,
        });
      } catch (cause) {
        if (isAbortError(cause)) {
          return;
        }

        setError(getWikimapiaUserMessage(cause, 'Не удалось загрузить объект'));
      } finally {
        setIsLoading(false);
      }
    },
    [createAbortController],
  );

  const clearSelection = useCallback(() => {
    abortRequest();
    setSelectedPlace(null);
    setIsLoading(false);
    setError(null);
  }, [abortRequest]);

  return {
    selectedPlace,
    isLoading,
    error,
    selectPlace,
    clearSelection,
  };
}
