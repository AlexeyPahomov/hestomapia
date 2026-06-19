import { useEffect, useRef } from 'react';
import type { Map as MaplibreMap } from 'maplibre-gl';
import { isAbortError, useAbortControllerRef } from '@shared/lib/async';
import { bindPlacesLayerEvents } from '../lib/bind-places-layer-events';
import { loadPlacesForMap } from '../lib/load-places-for-map';
import { ensurePlacesLayers, hasPlacesSource } from '../lib/places-layers';

type UseWikimapiaPlacesOnMapOptions = {
  map: MaplibreMap | null;
  onPlaceClick: (id: number, title: string) => void;
};

export function useWikimapiaPlacesOnMap({
  map,
  onPlaceClick,
}: UseWikimapiaPlacesOnMapOptions) {
  const { create: createAbortController, abort: abortRequest } =
    useAbortControllerRef();
  const onPlaceClickRef = useRef(onPlaceClick);

  onPlaceClickRef.current = onPlaceClick;

  useEffect(() => {
    if (!map) {
      return;
    }

    const loadPlaces = async () => {
      const abortController = createAbortController();

      try {
        await loadPlacesForMap(map, abortController.signal);
      } catch (cause) {
        if (isAbortError(cause)) {
          return;
        }

        console.error('Failed to load Wikimapia places:', cause);
      }
    };

    const handleLoad = () => {
      ensurePlacesLayers(map);
      void loadPlaces();
    };

    const handleMoveEnd = () => {
      if (!hasPlacesSource(map)) {
        return;
      }

      void loadPlaces();
    };

    if (map.isStyleLoaded()) {
      handleLoad();
    } else {
      map.on('load', handleLoad);
    }

    map.on('moveend', handleMoveEnd);

    const unbindLayerEvents = bindPlacesLayerEvents(map, (id, title) => {
      onPlaceClickRef.current(id, title);
    });

    return () => {
      abortRequest();
      map.off('load', handleLoad);
      map.off('moveend', handleMoveEnd);
      unbindLayerEvents();
    };
  }, [abortRequest, createAbortController, map]);
}
