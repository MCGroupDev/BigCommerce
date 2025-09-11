"use client";

import Link from "next/link";
import BannerDesktop from "./banner-desktop.webp";
import BannerMobile from "./banner-mobile.webp";

interface Props {
  href: string;
  alt: string;
}

export function ImageBanner({ href, alt }: Props) {
  return (
    <section
      className="
        w-full 
        px-2 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-12
      "
    >
      <div className="mx-auto w-full max-w-screen-xl">
        <Link href={href} className="block w-full">
          <picture>
            {/* Mobile */}
            <source media="(max-width: 767px)" srcSet={BannerMobile.src} />
            {/* Desktop */}
            <source media="(min-width: 768px)" srcSet={BannerDesktop.src} />
            {/* Fallback */}
            <img
              src={BannerDesktop.src}
              alt={alt}
              className="w-full h-auto object-cover rounded-lg"
            />
          </picture>
        </Link>
      </div>
    </section>
  );
}
