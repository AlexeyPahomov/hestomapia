export type MapBbox = {
  west: number;
  south: number;
  east: number;
  north: number;
};

export type WikimapiaPolygonPoint = {
  x: number;
  y: number;
};

export type WikimapiaPlaceSummary = {
  id: number;
  title: string;
  url?: string;
  polygon?: WikimapiaPolygonPoint[];
};

export type WikimapiaPlaceDetails = WikimapiaPlaceByIdResponse;

export type WikimapiaRawPlaceSummary = {
  id: number | string;
  title?: string;
  name?: string;
  url?: string;
  polygon?: WikimapiaPolygonPoint[];
  location?: {
    polygon?: WikimapiaPolygonPoint[];
  };
};

export type WikimapiaPlacesByAreaResponse = {
  places?: WikimapiaRawPlaceSummary[];
  folder?: WikimapiaRawPlaceSummary[];
  found?: number;
  page?: number;
  count?: number;
};

export type WikimapiaPlaceByIdResponse = {
  id: number;
  title: string;
  description?: string;
  url?: string;
};
