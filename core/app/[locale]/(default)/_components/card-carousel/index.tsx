"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/vibes/soul/primitives/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Card {
  id: string;
  title: string;
  href: string;
  image?: { src: string; alt: string };
}

interface CardCarouselProps {
  cards: Card[];
  aspectRatio?: "5:6" | "3:4" | "1:1";
  textColorScheme?: "light" | "dark";
  showButtons?: boolean;
  showScrollbar?: boolean;
}

export function CardCarousel({
  cards,
  aspectRatio = "3:4",
  textColorScheme = "light",
  showButtons = true,
  showScrollbar = true,
}: CardCarouselProps) {
  const aspectClass =
    aspectRatio === "5:6"
      ? "aspect-[5/6]"
      : aspectRatio === "1:1"
      ? "aspect-square"
      : "aspect-[3/4]";

  // 🔹 Scrollbar state
  const [scrollbar, setScrollbar] = useState({ width: 0, left: 0 });
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;

    const updateScrollbar = () => {
      const snapList = api.scrollSnapList();
      const idx = api.selectedScrollSnap();
      const width = 100 / snapList.length;
      const left = (idx / snapList.length) * 100;
      setScrollbar({ width, left });
    };

    updateScrollbar();
    api.on("select", updateScrollbar);
    api.on("reInit", updateScrollbar);

    return () => {
      api.off("select", updateScrollbar);
      api.off("reInit", updateScrollbar);
    };
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {cards.map((card) => (
            <CarouselItem
              key={card.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px]"
            >
              <a
                href={card.href}
                className="block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1"
              >
                {card.image && (
                  <img
                    src={card.image.src}
                    alt={card.image.alt}
                    className={`w-full object-cover ${aspectClass}`}
                  />
                )}
                <div
                  className={`mt-2 text-center text-sm font-medium ${
                    textColorScheme === "dark" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {card.title}
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Floating Buttons */}
      {showButtons && api && (
        <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4 pointer-events-none">
          <button
            onClick={() => api.scrollPrev()}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full 
                       bg-[var(--carousel-button-bg,hsl(var(--primary)))] 
                       text-[var(--carousel-button-icon,hsl(var(--background)))] 
                       shadow-lg hover:bg-[var(--carousel-button-bg-hover,hsl(var(--accent)))] 
                       transition"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
          <button
            onClick={() => api.scrollNext()}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full 
                       bg-[var(--carousel-button-bg,hsl(var(--primary)))] 
                       text-[var(--carousel-button-icon,hsl(var(--background)))] 
                       shadow-lg hover:bg-[var(--carousel-button-bg-hover,hsl(var(--accent)))] 
                       transition"
          >
            <ArrowRight size={20} strokeWidth={2} />
          </button>
        </div>
      )}

      {/* Scrollbar */}
      {showScrollbar && (
        <div className="mt-6 flex justify-center">
          <div className="relative w-48 h-2 rounded-full bg-[var(--carousel-scrollbar-track,hsl(var(--contrast-300)))] overflow-hidden">
            <div
              className="absolute h-2 rounded-full transition-all ease-out"
              style={{
                width: `${scrollbar.width}%`,
                left: `${scrollbar.left}%`,
                backgroundColor: `hsl(var(--primary))`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
