import type { Map as MaplibreMap } from 'maplibre-gl';
import { useEffect, useRef } from 'react';

export function useMapLoadEvent(
  map: MaplibreMap | null,
  onLoad?: () => void,
): void {
  const onLoadRef = useRef(onLoad);
  const hasNotifiedRef = useRef(false);

  onLoadRef.current = onLoad;

  useEffect(() => {
    if (!map) {
      return;
    }

    hasNotifiedRef.current = false;

    const notifyLoad = () => {
      if (hasNotifiedRef.current) {
        return;
      }

      hasNotifiedRef.current = true;
      onLoadRef.current?.();
    };

    if (map.isStyleLoaded()) {
      notifyLoad();
      return;
    }

    map.once('load', notifyLoad);

    return () => {
      map.off('load', notifyLoad);
    };
  }, [map]);
}
