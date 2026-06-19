import { useEffect } from 'react';
import type { Map as MaplibreMap } from 'maplibre-gl';
import { DEFAULT_MAP_ZOOM } from '@shared/config/map';
import { getCurrentPosition, toMapCenter } from '@shared/lib/geolocation';

export function useMapUserGeolocation(map: MaplibreMap | null) {
  useEffect(() => {
    if (!map) {
      return;
    }

    let cancelled = false;

    void getCurrentPosition()
      .then((coordinates) => {
        if (cancelled) {
          return;
        }

        map.flyTo({
          center: toMapCenter(coordinates),
          zoom: DEFAULT_MAP_ZOOM,
        });
      })
      .catch(() => {
        // Остаёмся на дефолтном bbox, если геолокация недоступна или отклонена.
      });

    return () => {
      cancelled = true;
    };
  }, [map]);
}
