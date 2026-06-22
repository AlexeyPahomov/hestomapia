import { useCallback, useEffect, useRef, useState } from 'react';

type UsePhotoCarouselOptions = {
  photoCount: number;
  isDesktop: boolean;
};

export function usePhotoCarousel({ photoCount, isDesktop }: UsePhotoCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = Math.max(0, Math.min(photoCount - 1, index));

      setActiveIndex(nextIndex);

      if (!isDesktop) {
        slideRefs.current[nextIndex]?.scrollIntoView({
          behavior: 'smooth',
          inline: 'nearest',
          block: 'nearest',
        });
      }
    },
    [isDesktop, photoCount],
  );

  const registerSlide = useCallback((index: number, element: HTMLDivElement | null) => {
    slideRefs.current[index] = element;
  }, []);

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, photoCount);
    setActiveIndex(0);
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [photoCount]);

  useEffect(() => {
    if (isDesktop || photoCount <= 1) {
      return;
    }

    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!mostVisible?.target) {
          return;
        }

        const index = Number(mostVisible.target.getAttribute('data-index'));

        if (!Number.isNaN(index)) {
          setActiveIndex(index);
        }
      },
      { root: scroller, threshold: 0.6 },
    );

    for (const slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide);
      }
    }

    return () => observer.disconnect();
  }, [isDesktop, photoCount]);

  return {
    activeIndex,
    canGoPrev: activeIndex > 0,
    canGoNext: activeIndex < photoCount - 1,
    scrollerRef,
    registerSlide,
    goTo,
  };
}
