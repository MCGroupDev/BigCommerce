import { cache } from 'react';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { FeaturedProductsCarouselFragment } from '~/components/featured-products-carousel/fragment';
import { FeaturedProductsListFragment } from '~/components/featured-products-list/fragment';
import { FooterFragment, FooterSectionsFragment } from '~/components/footer/fragment';
import { CurrencyCode, HeaderFragment, HeaderLinksFragment } from '~/components/header/fragment';
import { CategoryCarouselFragment } from '~/app/[locale]/(default)/_components/category-carousel/fragment';

export const LayoutQuery = graphql(
  `
    query LayoutQuery {
      site {
        ...HeaderFragment
        ...FooterFragment
      }
    }
  `,
  [HeaderFragment, FooterFragment],
);

export const GetLinksAndSectionsQuery = graphql(
  `
    query GetLinksAndSectionsQuery {
      site {
        ...HeaderLinksFragment
        ...FooterSectionsFragment
      }
    }
  `,
  [HeaderLinksFragment, FooterSectionsFragment],
);

const HomePageQuery = graphql(
  `
    query HomePageQuery($currencyCode: currencyCode) {
      site {
        featuredProducts(first: 12) {
          edges {
            node {
              ...FeaturedProductsListFragment
            }
          }
        }
        newestProducts(first: 12) {
          edges {
            node {
              ...FeaturedProductsCarouselFragment
            }
          }
        }

        # Add categories for carousel
        categoryTree {
          ...CategoryCarouselFragment
        }
      }
    }
  `,
  [
    FeaturedProductsCarouselFragment,
    FeaturedProductsListFragment,
    CategoryCarouselFragment,
  ],
);

export const getPageData = cache(
  async (currencyCode?: CurrencyCode, customerAccessToken?: string) => {
    const { data } = await client.fetch({
      document: HomePageQuery,
      customerAccessToken,
      variables: { currencyCode },
      fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
    });

    return data;
  },
);
