import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '@shared/config/map';
import { OSM_RASTER_STYLE } from './osm-style';

export function useMaplibre() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container,
      style: OSM_RASTER_STYLE,
      center: DEFAULT_MAP_CENTER,
      zoom: DEFAULT_MAP_ZOOM,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return containerRef;
}
