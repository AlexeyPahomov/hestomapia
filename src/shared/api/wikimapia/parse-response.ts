export type WikimapiaDebugResponse = {
  debug?: {
    code: number;
    message: string;
  };
};

export function parseWikimapiaResponse<T>(data: unknown): T {
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return { folder: [] } as T;
    }

    throw new Error('Wikimapia API вернул неожиданный массив');
  }

  const response = data as WikimapiaDebugResponse;

  if (response.debug) {
    throw new Error(
      `Wikimapia API: ${response.debug.message} (code ${response.debug.code})`,
    );
  }

  return data as T;
}
