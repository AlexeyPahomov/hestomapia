import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { DEFAULT_FIT_BOUNDS_PADDING, DEFAULT_MAP_BOUNDS } from '@shared/config/map';
import { addMapControls } from './map-controls';
import { OSM_RASTER_STYLE } from './osm-style';
import { useMapUserGeolocation } from './use-map-user-geolocation';

export function useMaplibre() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || mapRef.current) {
      return;
    }

    const mapInstance = new maplibregl.Map({
      container,
      style: OSM_RASTER_STYLE,
      bounds: DEFAULT_MAP_BOUNDS,
      fitBoundsOptions: { padding: DEFAULT_FIT_BOUNDS_PADDING },
    });

    addMapControls(mapInstance);

    mapRef.current = mapInstance;
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
      mapRef.current = null;
      setMap(null);
    };
  }, []);

  useMapUserGeolocation(map);

  return { containerRef, map };
}
