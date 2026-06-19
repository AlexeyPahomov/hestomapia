import type { Map as MaplibreMap } from 'maplibre-gl';
import { ensurePlacesLayers, hasPlacesSource } from './places-layers';

const MOVEEND_DEBOUNCE_MS = 500;
export function bindMapPlacesLoadTrigger(
  map: MaplibreMap,
  onViewportSettled: () => void,
): () => void {
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const scheduleLoad = () => {
    if (!hasPlacesSource(map)) {
      return;
    }

    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(onViewportSettled, MOVEEND_DEBOUNCE_MS);
  };

  const handleLoad = () => {
    ensurePlacesLayers(map);
    // moveend мог произойти до готовности слоёв — планируем загрузку тем же путём.
    scheduleLoad();
  };

  const handleMoveEnd = () => {
    scheduleLoad();
  };

  if (map.isStyleLoaded()) {
    handleLoad();
  } else {
    map.on('load', handleLoad);
  }

  map.on('moveend', handleMoveEnd);

  return () => {
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
    }

    map.off('load', handleLoad);
    map.off('moveend', handleMoveEnd);
  };
}
