import type { WikimapiaPhoto } from '@shared/api/wikimapia';
import { useMediaQuery } from '@shared/lib/media';
import { ChevronLeftIcon, ChevronRightIcon } from '@shared/ui/icon';
import { usePhotoCarousel } from '../model/usePhotoCarousel';
import { PlacePhotoSlide } from './PlacePhotoSlide';

type PlacePhotoGalleryProps = {
  photos: WikimapiaPhoto[];
};

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

const frameClassName = 'overflow-hidden rounded-xl ring-1 ring-black/5 shadow-sm';

const navButtonClassName =
  'absolute top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md ring-1 ring-black/5 motion-safe:transition hover:bg-white md:flex';

const mobileScrollerClassName =
  'flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden';

const desktopScrollerClassName =
  'flex motion-safe:transition-transform motion-safe:duration-300';

export function PlacePhotoGallery({ photos }: PlacePhotoGalleryProps) {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const { activeIndex, canGoPrev, canGoNext, scrollerRef, registerSlide, goTo } =
    usePhotoCarousel({
      photoCount: photos.length,
      isDesktop,
    });

  if (photos.length === 0) {
    return null;
  }

  if (photos.length === 1) {
    return (
      <div className={frameClassName}>
        <PlacePhotoSlide photo={photos[0]} index={0} isActive />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className={`relative ${frameClassName}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Фотографии объекта"
      >
        <div
          ref={scrollerRef}
          className={isDesktop ? desktopScrollerClassName : mobileScrollerClassName}
          style={isDesktop ? { transform: `translateX(-${activeIndex * 100}%)` } : undefined}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={(element) => registerSlide(index, element)}
              data-index={index}
              className="w-full shrink-0 snap-center"
              aria-hidden={index !== activeIndex}
            >
              <PlacePhotoSlide
                photo={photo}
                index={index}
                isActive={index === activeIndex}
              />
            </div>
          ))}
        </div>

        {canGoPrev && (
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Предыдущее фото"
            className={`${navButtonClassName} left-2`}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        )}

        {canGoNext && (
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Следующее фото"
            className={`${navButtonClassName} right-2`}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        )}

        <p
          className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white"
          aria-live="polite"
        >
          {activeIndex + 1} / {photos.length}
        </p>
      </div>

      <div className="flex justify-center gap-1.5">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Показать фото ${index + 1}`}
            aria-current={index === activeIndex}
            className={`h-1.5 rounded-full motion-safe:transition ${
              index === activeIndex ? 'w-4 bg-blue-600' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
