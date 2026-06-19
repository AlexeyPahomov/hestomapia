import { Suspense, lazy } from 'react';

const Map = lazy(() =>
  import('@widgets/map').then((module) => ({ default: module.Map })),
);

export function MainPage() {
  return (
    <main className="h-full w-full">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center text-base text-gray-500">
            Загрузка карты…
          </div>
        }
      >
        <Map />
      </Suspense>
    </main>
  );
}
