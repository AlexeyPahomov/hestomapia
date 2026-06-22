export const WIKIMAPIA_API_BASE = '/api/wikimapia';

export const WIKIMAPIA_PLACE_DETAILS_DATA_BLOCKS = 'main,location,comments,photos';

// place.getbyarea возвращает [] для многих ключей; box — рабочий аналог.
export const WIKIMAPIA_BOX_FUNCTION = 'box';

export const WIKIMAPIA_SOURCE_ID = 'wikimapia';
export const PLACES_FILL_LAYER_ID = 'places-fill';
export const PLACES_LINE_LAYER_ID = 'places-line';

export const PLACES_PER_PAGE = 100;

export const PLACES_LAYER_PAINT = {
  fillColor: '#3b82f6',
  fillOpacity: 0.25,
  lineColor: '#2563eb',
  lineWidth: 2,
} as const;
