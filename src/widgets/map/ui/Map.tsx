import { useMaplibre } from '@shared/lib/maplibre';
import { useWikimapiaPlacesOnMap } from '@features/load-places-by-bounds';
import { MapPlacesErrorAlert } from '@widgets/map/ui/MapPlacesErrorAlert';

type MapProps = {
  onPlaceClick: (id: number, title: string) => void;
  onMapLoad?: () => void;
};

export function Map({ onPlaceClick, onMapLoad }: MapProps) {
  const { containerRef, map } = useMaplibre(onMapLoad);
  const { loadError } = useWikimapiaPlacesOnMap({ map, onPlaceClick });

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      {loadError && <MapPlacesErrorAlert message={loadError} />}
    </div>
  );
}
