"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

import { Stream, Streamable } from "@/vibes/soul/lib/streamable";
import { Carousel, CarouselContent, CarouselItem } from "@/vibes/soul/primitives/carousel";
import type { Product as BaseProduct } from "@/vibes/soul/primitives/product-card";
import { SectionLayout } from "@/vibes/soul/sections/section-layout";
import { ProductCard } from "./ProductCard";

export type NewArrivalsProduct = BaseProduct;

interface Props {
  title: string;
  description?: string;
  products: Streamable<NewArrivalsProduct[]>;
  cta?: { href: string; label: string };
  aspectRatio?: "5:6" | "3:4" | "1:1";
  colorScheme?: "light" | "dark";
  showButtons?: boolean;
  showScrollbar?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  scrollbarLabel?: string;
}

export function NewArrivalsCarousel({
  title,
  description,
  products: streamableProducts,
  aspectRatio = "3:4",
  colorScheme = "light",
  showButtons = true,
  showScrollbar = true,
  previousLabel = "Previous",
  nextLabel = "Next",
  scrollbarLabel = "Scroll",
}: Props) {
  const [api, setApi] = useState<any>(null);
  const [scrollbar, setScrollbar] = useState({ width: 0, left: 0 });

  useEffect(() => {
    if (!api) return;
    const update = () => {
      const snaps = api.scrollSnapList?.() ?? [];
      if (snaps.length === 0) return;
      const i = api.selectedScrollSnap();
      setScrollbar({ width: 100 / snaps.length, left: (i / snaps.length) * 100 });
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <SectionLayout containerSize="2xl">      
      <div className="mb-6 flex w-full flex-row flex-wrap items-end justify-between gap-x-8 gap-y-6 @4xl:mb-8">
        <header className="font-[family-name:var(--featured-product-carousel-font-family,var(--font-family-body))]">
          <h2 className="font-[family-name:var(--featured-product-carousel-title-font-family,var(--font-family-heading))] text-2xl leading-none text-[var(--featured-product-carousel-title,hsl(var(--foreground)))] @xl:text-3xl @4xl:text-4xl">
            {title}
          </h2>
          {description != null && description !== "" && (
            <p className="mt-3 max-w-xl leading-relaxed text-[var(--featured-product-carousel-description,hsl(var(--contrast-500)))]">
              {description}
            </p>
          )}
        </header>
      </div>

      <Stream value={streamableProducts}>
        {(products) => (
          <div className="relative w-full px-4 @sm:px-6 @lg:px-8">
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent>
                {products.map(({ id, ...product }) => (
                  <CarouselItem
                    key={id}
                    className="basis-full pl-4 @md:basis-1/2 @lg:basis-1/3 @2xl:basis-1/4 @2xl:pl-5"
                  >
                    <ProductCard
                      aspectRatio={aspectRatio}
                      colorScheme={colorScheme}
                      product={{ id, ...product }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {showButtons && api && (
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                <button
                  aria-label={previousLabel}
                  onClick={() => api.scrollPrev()}
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--carousel-button-bg,hsl(var(--primary)))] text-[var(--carousel-button-icon,hsl(var(--background)))] shadow-[0_10px_15px_-3px_var(--carousel-button-shadow,rgba(0,0,0,0.25)),_0_4px_6px_-2px_var(--carousel-button-shadow,rgba(0,0,0,0.25))] hover:bg-[var(--carousel-button-bg-hover,hsl(var(--accent)))] transition"
                  title={previousLabel}
                >
                  <ArrowLeft size={20} strokeWidth={2} />
                </button>
                <button
                  aria-label={nextLabel}
                  onClick={() => api.scrollNext()}
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--carousel-button-bg,hsl(var(--primary)))] text-[var(--carousel-button-icon,hsl(var(--background)))] shadow-[0_10px_15px_-3px_var(--carousel-button-shadow,rgba(0,0,0,0.25)),_0_4px_6px_-2px_var(--carousel-button-shadow,rgba(0,0,0,0.25))] hover:bg-[var(--carousel-button-bg-hover,hsl(var(--accent)))] transition"
                  title={nextLabel}
                >
                  <ArrowRight size={20} strokeWidth={2} />
                </button>
              </div>
            )}

            {showScrollbar && (
              <div className="mt-6 flex w-full items-center justify-center">
                <div className="relative h-2 w-48 rounded-full bg-[var(--carousel-scrollbar-track,hsl(var(--contrast-300)))]">
                  <div
                    aria-label={scrollbarLabel}
                    className="absolute h-2 rounded-full bg-[var(--carousel-scrollbar-thumb,hsl(var(--primary)))] transition-all ease-out"
                    style={{ width: `${scrollbar.width}%`, left: `${scrollbar.left}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </Stream>
    </SectionLayout>
  );
}
