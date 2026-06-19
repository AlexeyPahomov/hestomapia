import { useCallback, useEffect, useRef } from 'react';

export function useAbortControllerRef() {
  const abortControllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

  const create = useCallback(() => {
    abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    return abortController;
  }, [abort]);

  useEffect(() => abort, [abort]);

  return { create, abort };
}
