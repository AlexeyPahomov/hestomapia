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

export type WikimapiaPhoto = {
  id: number;
  previewUrl: string;
  fullUrl: string;
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
  photos: WikimapiaPhoto[];
  comments: WikimapiaComment[];
};

export type WikimapiaRawPlaceByIdResponse = {
  id: number;
  title?: string;
  description?: string;
  url?: string;
  main?: {
    title?: string;
    description?: string;
    url?: string;
  };
  location?: WikimapiaRawLocation;
  comments?: WikimapiaRawComment[];
  photos?: WikimapiaRawPhoto[];
};

export type WikimapiaRawComment = {
  num?: number;
  name: string;
  message: string;
  date?: number;
  is_deleted?: boolean;
};

export type WikimapiaRawPhoto = {
  id: number;
  status?: number;
  thumbnail_url?: string;
  big_url?: string;
  '960_url'?: string;
  full_url?: string;
};

export type WikimapiaRawLocation = {
  lat?: number;
  lon?: number;
};
