import { useMaplibre } from '@shared/lib/maplibre';
import { useWikimapiaPlacesOnMap } from '@features/load-places-by-bounds';

type MapProps = {
  onPlaceClick: (id: number, title: string) => void;
};

export function Map({ onPlaceClick }: MapProps) {
  const { containerRef, map } = useMaplibre();

  useWikimapiaPlacesOnMap({ map, onPlaceClick });

  return <div ref={containerRef} className="h-full w-full" />;
}
