import { useCallback, useEffect, useState } from 'react';
import {
  getWikimapiaUserMessage,
  isWikimapiaQuotaError,
} from '@shared/api/wikimapia';

export function usePlacesLoadError(
  error: Error | null,
  onQuotaExceeded: () => void,
): string | null {
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) {
      return;
    }

    setLoadError(getWikimapiaUserMessage(error));

    if (isWikimapiaQuotaError(error)) {
      onQuotaExceeded();
      return;
    }

    console.error('Failed to load Wikimapia places:', error);
  }, [error, onQuotaExceeded]);

  return loadError;
}

export function useQuotaBlockState() {
  const [isQuotaBlocked, setIsQuotaBlocked] = useState(false);
  const blockQuota = useCallback(() => {
    setIsQuotaBlocked(true);
  }, []);

  return { isQuotaBlocked, blockQuota };
}
