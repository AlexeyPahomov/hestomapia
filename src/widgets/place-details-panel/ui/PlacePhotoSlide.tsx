import type { WikimapiaPhoto } from '@shared/api/wikimapia';

type PlacePhotoSlideProps = {
  photo: WikimapiaPhoto;
  index: number;
  isActive: boolean;
};

export function PlacePhotoSlide({ photo, index, isActive }: PlacePhotoSlideProps) {
  return (
    <a
      href={photo.fullUrl}
      target="_blank"
      rel="noreferrer"
      tabIndex={isActive ? 0 : -1}
      aria-label={`Открыть фото ${index + 1} в полном размере`}
      className="group relative block aspect-16/10 w-full overflow-hidden bg-gray-100"
    >
      <img
        src={photo.previewUrl}
        alt=""
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover motion-safe:transition motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/0 motion-safe:transition motion-safe:group-hover:bg-black/10"
      />
    </a>
  );
}
