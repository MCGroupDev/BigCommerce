import { graphql } from '~/client/graphql';

export const CategoryCarouselFragment = graphql(`
  fragment CategoryCarouselFragment on CategoryTreeItem {
    entityId
    name
    path
    image {
      url(width: 600, height: 600)
      altText
    }
  }
`);
