import { Suspense, lazy } from 'react';
import { usePlaceDetails } from '@features/place-details';
import { PlaceDetailsPanel } from '@widgets/place-details-panel';

const Map = lazy(() =>
  import('@widgets/map').then((module) => ({ default: module.Map })),
);

export function MainPage() {
  const {
    selectedPlace,
    isLoading,
    error,
    selectPlace,
    clearSelection,
  } = usePlaceDetails();

  return (
    <main className="flex h-full w-full flex-col md:flex-row">
      <div className="relative min-h-0 min-w-0 flex-1">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center text-base text-gray-500">
              Загрузка карты…
            </div>
          }
        >
          <Map
            onPlaceClick={(id, title) => {
              void selectPlace(id, title);
            }}
          />
        </Suspense>
      </div>

      <PlaceDetailsPanel
        place={selectedPlace}
        isLoading={isLoading}
        error={error}
        onClose={clearSelection}
      />
    </main>
  );
}
