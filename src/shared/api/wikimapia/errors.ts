export const WIKIMAPIA_ERROR_CODES = {
  KEY_LIMIT: 1004,
} as const;

export class WikimapiaApiError extends Error {
  readonly code: number;
  readonly apiMessage: string;

  constructor(code: number, message: string) {
    super(`Wikimapia API: ${message} (code ${code})`);
    this.name = 'WikimapiaApiError';
    this.code = code;
    this.apiMessage = message;
  }
}

export function isWikimapiaApiError(error: unknown): error is WikimapiaApiError {
  return error instanceof WikimapiaApiError;
}

export function isWikimapiaQuotaError(error: unknown): boolean {
  return (
    isWikimapiaApiError(error) && error.code === WIKIMAPIA_ERROR_CODES.KEY_LIMIT
  );
}

export function getWikimapiaUserMessage(
  error: unknown,
  fallback = 'Не удалось загрузить данные Wikimapia',
): string {
  if (isWikimapiaApiError(error)) {
    return error.apiMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export function shouldRetryWikimapiaRequest(
  failureCount: number,
  error: Error,
): boolean {
  if (isWikimapiaApiError(error)) {
    return false;
  }

  return failureCount < 1;
}
