import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';

import { Streamable } from '@/vibes/soul/lib/streamable';
import { NewArrivalsCarousel } from './_components/new-arrivals-carousel';
import { getSessionCustomerAccessToken } from '~/auth';
import { productCardTransformer } from '~/data-transformers/product-card-transformer';
import { getPreferredCurrencyCode } from '~/lib/currency';

import { Slideshow } from './_components/slideshow';

import { ImageBanner } from "./_components/banner/ImageBanner";
import { DoubleBanner } from './_components/banner/DoubleBanner';
import DoubleBannerOne from './_components/banner/Double Banner 1.webp';
import DoubleBannerTwo from './_components/banner/Double Banner 2.webp';
import { IconBlocks } from './_components/icon-blocks';

import { CategoryCarousel } from './_components/category-carousel';


import { getPageData } from './page-data';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const format = await getFormatter();

  const streamablePageData = Streamable.from(async () => {
    const customerAccessToken = await getSessionCustomerAccessToken();
    const currencyCode = await getPreferredCurrencyCode();

    return getPageData(currencyCode, customerAccessToken);
  });

  const streamableCategories = Streamable.from(async () => {
    const data = await streamablePageData;
    return data.site.categoryTree.slice(0, 6);
  });

  const streamableFeaturedProducts = Streamable.from(async () => {
    const data = await streamablePageData;

    const featuredProducts = removeEdgesAndNodes(data.site.featuredProducts);

    return productCardTransformer(featuredProducts, format);
  });

  const streamableNewestProducts = Streamable.from(async () => {
    const data = await streamablePageData;

    const newestProducts = removeEdgesAndNodes(data.site.newestProducts);

    return productCardTransformer(newestProducts, format);
  });

  return (

    <main>
      {/* 1. Hero */}
      <Slideshow />

      {/* Banner */}
      <section className="py-16">
        <ImageBanner href="/shop-all" alt="Shop All Products" />
      </section>

      {/* 2. Shop by Category */}
      <CategoryCarousel
        categories={await streamableCategories}
        title="Shop by Category"
        description="Browse our most popular collections."
        cta={{ href: "/categories", label: "View All Categories" }}
      />


      {/* 2. New Arrivals (custom carousel) */}
        <NewArrivalsCarousel
          title={t('NewestProducts.title')}
          description={t('NewestProducts.description')}
          products={streamableNewestProducts}
          previousLabel={t('NewestProducts.previousProducts')}
          nextLabel={t('NewestProducts.nextProducts')}
          scrollbarLabel={t('NewestProducts.cta')}
        />

      {/* Double Banner */}
      <DoubleBanner
        left={{
          desktopSrc: DoubleBannerOne.src,
          alt: 'Shop New Collections',
          href: '/shop-all',
        }}
        right={{
          desktopSrc: DoubleBannerTwo.src,
          alt: 'Explore Best Sellers',
          href: '/shop-all?sort=bestselling',
        }}
      />

      {/* Icon Blocks */}
        <IconBlocks />



    </main>

  );
}
