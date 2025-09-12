"use client";

import Link from "next/link";
import { FragmentOf } from "~/client/graphql";
import { CategoryCarouselFragment } from "./fragment";
import { CardCarousel } from "../card-carousel";
import { SectionLayout } from "@/vibes/soul/sections/section-layout";
import { AnimatedUnderline } from "@/vibes/soul/primitives/animated-underline";

type Category = FragmentOf<typeof CategoryCarouselFragment>;

interface Props {
  categories: Category[];
  title: string;
  description?: string;
  cta?: { href: string; label: string };
}

export function CategoryCarousel({ categories, title, description, cta }: Props) {
  const items = categories.flatMap((cat) => [cat, ...(cat.children ?? [])]);

  return (
    <SectionLayout containerSize="2xl">
      {/* Header Row */}
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
        {cta != null && cta.href !== "" && cta.label !== "" && (
          <Link className="group/underline focus:outline-none" href={cta.href}>
            <AnimatedUnderline className="mr-3">{cta.label}</AnimatedUnderline>
          </Link>
        )}
      </div>

      {/* Carousel */}
      <div className="group/category-carousel">
        <CardCarousel
          cards={items.map((cat, i) => ({
            id: String(cat.entityId ?? i),
            title: cat.name,
            href: cat.path,
            image: cat.image
              ? { src: cat.image.url, alt: cat.image.altText ?? cat.name }
              : undefined,
          }))}
          aspectRatio="3:4"
          textColorScheme="dark"
          showButtons
          showScrollbar
        />
      </div>
    </SectionLayout>
  );
}
