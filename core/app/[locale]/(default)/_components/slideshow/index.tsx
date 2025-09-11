"use client";

import { useTranslations } from 'next-intl';
import { Slideshow as SlideshowSection } from '~/vibes/soul/sections/slideshow';
import { useMediaQuery } from '~/app/hooks/useMediaQuery';

import Slide01Desktop from './slide01-desktop.webp';
import Slide01Mobile from './slide01-mobile.webp';
import Slide02Desktop from './slide02-desktop.webp';
import Slide02Mobile from './slide02-mobile.webp';
import Slide03Desktop from './slide03-desktop.webp';
import Slide03Mobile from './slide03-mobile.webp';

type ResponsiveSlide = {
  title: string;
  description?: string;
  showDescription?: boolean;
  cta?: { href: string; label: string };
  showCta?: boolean;
  image: {
    desktop: { src: string; blurDataURL?: string };
    mobile: { src: string; blurDataURL?: string };
    alt: string;
  };
};

export function Slideshow({ disableBackground = true }: { disableBackground?: boolean }) {
  const t = useTranslations('Home.Slideshow');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const slides: ResponsiveSlide[] = [
    {
      title: '',
      description: t('Slide01.description'),
      showDescription: false,
      cta: { href: '/shop-all', label: t('Slide01.cta') },
      image: {
        desktop: { src: Slide01Desktop.src, blurDataURL: Slide01Desktop.blurDataURL },
        mobile: { src: Slide01Mobile.src, blurDataURL: Slide01Mobile.blurDataURL },
        alt: t('Slide01.alt'),
      },
    },
    {
      title: '',
      description: t('Slide02.description'),
      showDescription: false,
      cta: { href: '/shop-all', label: t('Slide02.cta') },
      image: {
        desktop: { src: Slide02Desktop.src, blurDataURL: Slide02Desktop.blurDataURL },
        mobile: { src: Slide02Mobile.src, blurDataURL: Slide02Mobile.blurDataURL },
        alt: t('Slide02.alt'),
      },
    },

    {
      title: 'Shop Online 24/7',
      description: t('Slide03.description'),
      cta: { href: '/shop-all', label: t('Slide03.cta') },
      image: {
        desktop: { src: Slide03Desktop.src, blurDataURL: Slide03Desktop.blurDataURL },
        mobile: { src: Slide03Mobile.src, blurDataURL: Slide03Mobile.blurDataURL },
        alt: t('Slide03.alt'),
      },
    },
  ];

  const preparedSlides = slides.map((slide) => ({
    ...slide,
    image: {
      alt: slide.image.alt,
      src: isMobile ? slide.image.mobile.src : slide.image.desktop.src,
      blurDataUrl: isMobile
        ? slide.image.mobile.blurDataURL
        : slide.image.desktop.blurDataURL,
    },
  }));

  return (
    <SlideshowSection
      slides={preparedSlides}
      className={disableBackground ? 'disable-background' : undefined}
    />
  );
}
