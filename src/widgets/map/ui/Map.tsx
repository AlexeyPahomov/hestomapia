import { useMaplibre } from '@shared/lib/maplibre';
import { useWikimapiaPlacesOnMap } from '@features/load-places-by-bounds';

type MapProps = {
  onPlaceClick: (id: number, title: string) => void;
  onMapLoad?: () => void;
};

export function Map({ onPlaceClick, onMapLoad }: MapProps) {
  const { containerRef, map } = useMaplibre(onMapLoad);

  useWikimapiaPlacesOnMap({ map, onPlaceClick });

  return <div ref={containerRef} className="h-full w-full" />;
}
