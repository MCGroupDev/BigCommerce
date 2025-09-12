"use client";

import { clsx } from "clsx";
import { CreditCard, Headset, ShieldCheck, Store } from "lucide-react";

import { SectionLayout } from "@/vibes/soul/sections/section-layout";

interface Item {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
}

export function IconBlocks() {
  const items: Item[] = [
    {
      title: "In-Store Pickup",
      subtitle: "Order online, pick up fast",
      icon: <Store aria-hidden className="h-6 w-6" strokeWidth={1.75} />,
    },
    {
      title: "Safe Payment",
      subtitle: "Secure checkout",
      icon: <CreditCard aria-hidden className="h-6 w-6" strokeWidth={1.75} />,
    },
    {
      title: "Shop With Confidence",
      subtitle: "Hassle free returns",
      icon: <ShieldCheck aria-hidden className="h-6 w-6" strokeWidth={1.75} />,
    },
    {
      title: "Dedicated Support",
      subtitle: "Here to help",
      icon: <Headset aria-hidden className="h-6 w-6" strokeWidth={1.75} />,
    },
  ];

  return (
    <SectionLayout containerSize="full">
      <div
        className={clsx(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={clsx(
              "flex items-center gap-4 rounded-xl border border-[hsl(var(--contrast-200))] bg-[hsl(var(--background))] p-4 shadow-sm transition-shadow hover:shadow-md",
            )}
          >
            <div
              className={clsx(
                "grid h-12 w-12 place-content-center rounded-full",
                "bg-[color-mix(in_oklab,hsl(var(--secondary)),white_85%)]",
                "text-[hsl(var(--secondary))]",
              )}
              aria-hidden
            >
              {item.icon}
            </div>
            <div>
              <div className="text-sm font-semibold text-[hsl(var(--foreground))]">
                {item.title}
              </div>
              {item.subtitle ? (
                <div className="text-xs text-[hsl(var(--contrast-500))]">
                  {item.subtitle}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}




