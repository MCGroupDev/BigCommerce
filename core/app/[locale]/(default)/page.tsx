import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';

import { Streamable } from '@/vibes/soul/lib/streamable';
import { FeaturedProductCarousel } from '@/vibes/soul/sections/featured-product-carousel';
import { FeaturedProductList } from '@/vibes/soul/sections/featured-product-list';
import { getSessionCustomerAccessToken } from '~/auth';
import { productCardTransformer } from '~/data-transformers/product-card-transformer';
import { getPreferredCurrencyCode } from '~/lib/currency';

import { Slideshow } from './_components/slideshow';

import { ImageBanner } from "./_components/banner/ImageBanner";

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

      <ImageBanner href="/shop-all" alt="Shop All Products" />

      {/* 2. Shop by Category */}

      <CategoryCarousel
        categories={await streamableCategories}
        title="Shop by Category"
        description="Browse our most popular collections."
        cta={{ href: "/categories", label: "View All Categories" }}
      />


      {/* 2. New Arrivals */}
      <section className="py-16 bg-gray-50">
        <FeaturedProductCarousel cta={{ label: t('NewestProducts.cta'), href: '/shop-all/?sort=newest' }}
          description={t('NewestProducts.description')}
          emptyStateSubtitle={t('NewestProducts.emptyStateSubtitle')}
          emptyStateTitle={t('NewestProducts.emptyStateTitle')}
          nextLabel={t('NewestProducts.nextProducts')}
          previousLabel={t('NewestProducts.previousProducts')}
          products={streamableNewestProducts} title={t('NewestProducts.title')}
        />
      </section>

      {/* 3. Featured Products */}
      <section className="py-12">
        <FeaturedProductList cta={{ label: t('FeaturedProducts.cta'), href: '/shop-all' }}
          description={t('FeaturedProducts.description')}
          emptyStateSubtitle={t('FeaturedProducts.emptyStateSubtitle')}
          emptyStateTitle={t('FeaturedProducts.emptyStateTitle')}
          products={streamableFeaturedProducts}
          title={t('FeaturedProducts.title')}
        />
      </section>

    </main>

  );
}
