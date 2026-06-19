import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '@shared/config/map';
import { OSM_RASTER_STYLE } from './osm-style';

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
      center: DEFAULT_MAP_CENTER,
      zoom: DEFAULT_MAP_ZOOM,
    });

    mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = mapInstance;
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
      mapRef.current = null;
      setMap(null);
    };
  }, []);

  return { containerRef, map };
}
