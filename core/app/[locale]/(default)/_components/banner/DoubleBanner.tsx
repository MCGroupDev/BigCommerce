"use client";

import Link from "next/link";
import { clsx } from "clsx";

type BannerImage = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  href: string;
};

interface Props {
  left: BannerImage;
  right: BannerImage;
  className?: string;
}

export function DoubleBanner({ left, right, className }: Props) {
  return (
    <section
      className={clsx(
        "w-full px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-8 lg:py-12",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <BannerCard {...left} />
        <BannerCard {...right} />
      </div>
    </section>
  );
}

function BannerCard({ desktopSrc, mobileSrc, alt, href }: BannerImage) {
  return (
    <Link
      href={href}
      className="group block w-full overflow-hidden rounded-xl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <picture>
        {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} /> : null}
        <source media="(min-width: 768px)" srcSet={desktopSrc} />
        <img
          src={desktopSrc}
          alt={alt}
          className="h-auto w-full object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
          loading="lazy"
        />
      </picture>
    </Link>
  );
}
