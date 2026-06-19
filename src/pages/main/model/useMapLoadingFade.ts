import { useCallback, useState, type TransitionEvent } from 'react';

export function useMapLoadingFade() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isOverlayMounted, setIsOverlayMounted] = useState(true);

  const onMapLoad = useCallback(() => {
    setIsMapLoaded(true);
  }, []);

  const onOverlayFadeComplete = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName !== 'opacity' || !isMapLoaded) {
        return;
      }

      setIsOverlayMounted(false);
    },
    [isMapLoaded],
  );

  return {
    isMapLoaded,
    isOverlayMounted,
    onMapLoad,
    onOverlayFadeComplete,
  };
}
