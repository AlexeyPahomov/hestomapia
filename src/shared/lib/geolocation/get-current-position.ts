import { GEOLOCATION_OPTIONS } from './constants';

export type Coordinates = {
  longitude: number;
  latitude: number;
};

export function getCurrentPosition(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => reject(error),
      GEOLOCATION_OPTIONS,
    );
  });
}

export function toMapCenter({ longitude, latitude }: Coordinates): [number, number] {
  return [longitude, latitude];
}
