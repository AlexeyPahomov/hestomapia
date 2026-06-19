import { Suspense, lazy } from 'react';
import { usePlaceDetails } from '@features/place-details';
import { PlaceDetailsPanel } from '@widgets/place-details-panel';

const Map = lazy(() =>
  import('@widgets/map').then((module) => ({ default: module.Map })),
);

export function MainPage() {
  const { selectedPlace, isLoading, error, selectPlace, clearSelection } =
    usePlaceDetails();

  return (
    <main className="relative h-full w-full">
      <Suspense
        fallback={
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
            <h1 className="text-xl font-semibold text-gray-700">
              Добро пожаловать в Хестомапию!
            </h1>
            <p className="text-base text-gray-500">Загрузка карты…</p>
          </div>
        }
      >
        <Map
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
