import type { TransitionEvent } from 'react';

const MAP_LOADING_FADE_MS = 500;

type MapLoadingOverlayProps = {
  isFadingOut: boolean;
  onFadeComplete: (event: TransitionEvent<HTMLDivElement>) => void;
};

export function MapLoadingOverlay({
  isFadingOut,
  onFadeComplete,
}: MapLoadingOverlayProps) {
  return (
    <div
      aria-hidden={isFadingOut}
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white text-center transition-opacity ease-out ${
        isFadingOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${MAP_LOADING_FADE_MS}ms` }}
      onTransitionEnd={onFadeComplete}
    >
      <h1 className="text-xl font-semibold text-gray-700">
        Добро пожаловать в Хестомапию!
      </h1>
      <p className="text-base text-gray-500">Загрузка карты…</p>
    </div>
  );
}
