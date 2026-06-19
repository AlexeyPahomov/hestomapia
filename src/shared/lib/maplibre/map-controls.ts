import maplibregl from 'maplibre-gl';
import { GEOLOCATION_OPTIONS } from '@shared/lib/geolocation';

export function addMapControls(map: maplibregl.Map) {
  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  map.addControl(
    new maplibregl.GeolocateControl({
      positionOptions: GEOLOCATION_OPTIONS,
      trackUserLocation: false,
      showUserLocation: true,
    }),
    'top-right',
  );
}
