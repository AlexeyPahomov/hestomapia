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

export type WikimapiaCoordinates = {
  lat: number;
  lon: number;
};

export type WikimapiaComment = {
  id: string;
  name: string;
  message: string;
  date?: number;
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
  coordinates?: WikimapiaCoordinates;
  comments: WikimapiaComment[];
};

export type WikimapiaRawComment = {
  num?: number;
  name: string;
  message: string;
  date?: number;
  is_deleted?: boolean;
};

export type WikimapiaRawLocation = {
  lat?: number;
  lon?: number;
};
