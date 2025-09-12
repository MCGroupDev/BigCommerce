"use client";

import { clsx } from "clsx";
import type { Price } from "@/vibes/soul/primitives/price-label";
import { PriceLabel } from "@/vibes/soul/primitives/price-label";
import { Badge } from "@/vibes/soul/primitives/badge";
import { Image } from "~/components/image";
import { Link } from "~/components/link";
import { AddToCartForm } from "@/vibes/soul/primitives/compare-card/add-to-cart-form";
import { addToCart as compareAddToCart } from "~/app/[locale]/(default)/compare/_actions/add-to-cart";

export interface NewArrivalsProduct {
  id: string;
  title: string;
  href: string;
  image?: { src: string; alt: string };
  price?: Price;
  subtitle?: string;
  badge?: string;
}

interface Props {
  product: NewArrivalsProduct;
  aspectRatio?: "5:6" | "3:4" | "1:1";
  colorScheme?: "light" | "dark";
  addToCartLabel?: string;
  preorderLabel?: string;
  isPreorder?: boolean;
}

export function ProductCard({
  product: { id, title, subtitle, badge, price, image, href },
  aspectRatio = "3:4",
  colorScheme = "light",
  addToCartLabel = "Add to Cart",
  preorderLabel = "Preorder",
  isPreorder = false,
}: Props) {
  return (
    <article
      className={clsx(
        "group relative max-w-md rounded-xl border border-[hsl(var(--contrast-200))] bg-[hsl(var(--background))] p-3 shadow-sm transition-shadow hover:shadow-md @container",
        // Standardized card heights across items
        "h-[26rem] @sm:h-[26rem]",
      )}
    >
      <div className="relative flex h-full flex-col">
        {/* Image area: object-contain to avoid cropping */}
        <div
          className={clsx(
            "relative overflow-hidden rounded-lg bg-[hsl(var(--background))]",
            // Taller container for a more vertical card
            "h-56 @sm:h-64",
          )}
        >
          {image ? (
            <Image
              alt={image.alt}
              className="object-contain p-2"
              fill
              sizes="(min-width: 80rem) 20vw, (min-width: 64rem) 25vw, (min-width: 42rem) 33vw, (min-width: 24rem) 50vw, 100vw"
              src={image.src}
            />
          ) : (
            <div
              className={clsx(
                "flex h-full w-full items-center justify-center px-4 text-center text-2xl font-semibold opacity-40",
                {
                  light: "text-[var(--product-card-light-title,hsl(var(--foreground)))]",
                  dark: "text-[var(--product-card-dark-title,hsl(var(--background)))]",
                }[colorScheme],
              )}
            >
              {title}
            </div>
          )}
          {badge && (
            <Badge className="absolute left-3 top-3" shape="rounded">
              {badge}
            </Badge>
          )}
        </div>

        {/* Copy area */}
        <div className="mt-3 flex flex-1 flex-col space-y-2">
          {subtitle && (
            <div className="text-xs uppercase tracking-wide text-[hsl(var(--contrast-500))]">{subtitle}</div>
          )}

          <div
            className={clsx(
              "line-clamp-2 text-sm font-semibold",
              {
                light: "text-[var(--product-card-light-title,hsl(var(--foreground)))]",
                dark: "text-[var(--product-card-dark-title,hsl(var(--background)))]",
              }[colorScheme],
            )}
          >
            {title}
          </div>

          {price != null && (
            <div>
              <PriceLabel colorScheme={colorScheme} price={price} />
            </div>
          )}

          {/* CTA */}
          <div
            className="relative z-10 [--button-primary-background:hsl(var(--accent))] [--button-primary-background-hover:hsl(var(--accent-hover,var(--accent)))] [--button-primary-text:hsl(var(--background))] [--button-primary-border:hsl(var(--accent))]"
            // Pin CTA to the bottom of the card
            style={{ marginTop: 'auto' }}
          >
            <AddToCartForm
              addToCartAction={compareAddToCart}
              addToCartLabel={addToCartLabel}
              disabled={false}
              isPreorder={isPreorder}
              preorderLabel={preorderLabel}
              productId={id}
            />
          </div>
        </div>

        {/* Overlay link for card click */}
        {href !== "#" && (
          <Link
            aria-label={title}
            className={clsx(
              "absolute inset-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--product-card-focus,hsl(var(--primary)))] focus-visible:ring-offset-2",
              {
                light: "ring-offset-[var(--product-card-light-offset,hsl(var(--background)))]",
                dark: "ring-offset-[var(--product-card-dark-offset,hsl(var(--foreground)))]",
              }[colorScheme],
            )}
            href={href}
            id={id}
          >
            <span className="sr-only">View product</span>
          </Link>
        )}
      </div>
    </article>
  );
}
