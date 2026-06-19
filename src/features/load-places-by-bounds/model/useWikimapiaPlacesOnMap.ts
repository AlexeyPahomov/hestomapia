import type { Map as MaplibreMap } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import { getBboxFromMap } from '@shared/lib/maplibre';
import { bindPlacesLayerEvents } from '../lib/bind-places-layer-events';
import { bindMapPlacesLoadTrigger } from '../lib/bind-map-places-load-trigger';
import type { PlacesQueryParams } from '../lib/places-query';
import { setPlacesGeoJSONOnMap } from '../lib/places-layers';
import { usePlacesInBboxQuery } from './usePlacesInBboxQuery';

type UseWikimapiaPlacesOnMapOptions = {
  map: MaplibreMap | null;
  onPlaceClick: (id: number, title: string) => void;
};

export function useWikimapiaPlacesOnMap({
  map,
  onPlaceClick,
}: UseWikimapiaPlacesOnMapOptions) {
  const [queryParams, setQueryParams] = useState<PlacesQueryParams | null>(null);
  const onPlaceClickRef = useRef(onPlaceClick);

  onPlaceClickRef.current = onPlaceClick;

  const { data: placesGeoJSON } = usePlacesInBboxQuery(queryParams);

  useEffect(() => {
    if (!map || !placesGeoJSON) {
      return;
    }

    setPlacesGeoJSONOnMap(map, placesGeoJSON);
  }, [map, placesGeoJSON]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const unbindLoadTrigger = bindMapPlacesLoadTrigger(map, () => {
      setQueryParams({
        bbox: getBboxFromMap(map),
        zoom: map.getZoom(),
      });
    });

    const unbindLayerEvents = bindPlacesLayerEvents(map, (id, title) => {
      onPlaceClickRef.current(id, title);
    });

    return () => {
      unbindLoadTrigger();
      unbindLayerEvents();
    };
  }, [map]);
}
