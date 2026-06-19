import type { Map as MaplibreMap, MapLayerMouseEvent } from 'maplibre-gl';
import { PLACES_FILL_LAYER_ID } from '@shared/config/wikimapia';

type PlaceClickHandler = (id: number, title: string) => void;

export function bindPlacesLayerEvents(
  map: MaplibreMap,
  onPlaceClick: PlaceClickHandler,
) {
  const handleClick = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];

    if (!feature) {
      return;
    }

    const id = Number(feature.properties?.id);
    const title = String(feature.properties?.title ?? '');

    if (!Number.isNaN(id)) {
      onPlaceClick(id, title);
    }
  };

  const handleMouseEnter = () => {
    map.getCanvas().style.cursor = 'pointer';
  };

  const handleMouseLeave = () => {
    map.getCanvas().style.cursor = '';
  };

  map.on('click', PLACES_FILL_LAYER_ID, handleClick);
  map.on('mouseenter', PLACES_FILL_LAYER_ID, handleMouseEnter);
  map.on('mouseleave', PLACES_FILL_LAYER_ID, handleMouseLeave);

  return () => {
    map.off('click', PLACES_FILL_LAYER_ID, handleClick);
    map.off('mouseenter', PLACES_FILL_LAYER_ID, handleMouseEnter);
    map.off('mouseleave', PLACES_FILL_LAYER_ID, handleMouseLeave);
  };
}
