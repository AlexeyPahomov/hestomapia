import { useMaplibre } from '@shared/lib/maplibre';

export function Map() {
  const containerRef = useMaplibre();

  return <div ref={containerRef} className="h-full w-full" />;
}
