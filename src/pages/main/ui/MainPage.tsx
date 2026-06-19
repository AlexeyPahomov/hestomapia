import { Suspense, lazy } from 'react';
import { usePlaceDetails } from '@features/place-details';
import { PlaceDetailsPanel } from '@widgets/place-details-panel';
import { useMapLoadingFade } from '../model/useMapLoadingFade';
import { MapLoadingOverlay } from './MapLoadingOverlay';

const Map = lazy(() =>
  import('@widgets/map').then((module) => ({ default: module.Map })),
);

export function MainPage() {
  const { isMapLoaded, isOverlayMounted, onMapLoad, onOverlayFadeComplete } =
    useMapLoadingFade();
  const { selectedPlace, isLoading, error, selectPlace, clearSelection } =
    usePlaceDetails();

  return (
    <main className="relative h-full w-full">
      {isOverlayMounted && (
        <MapLoadingOverlay
          isFadingOut={isMapLoaded}
          onFadeComplete={onOverlayFadeComplete}
        />
      )}

      <Suspense fallback={null}>
        <Map
          onMapLoad={onMapLoad}
          onPlaceClick={(id, title) => {
            void selectPlace(id, title);
          }}
        />
      </Suspense>

      <PlaceDetailsPanel
        place={selectedPlace}
        isLoading={isLoading}
        error={error}
        onClose={clearSelection}
      />
    </main>
  );
}
