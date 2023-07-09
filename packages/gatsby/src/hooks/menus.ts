import { graphql, useStaticQuery } from 'gatsby';

interface PageMenu {
  id: string;
  uri: string;
  title: string;
}

type MenuNode = Queries.PagesMenuQuery['allWpPage']['edges'][0];

export const usePagesMenu = () => {
  const data: Queries.PagesMenuQuery = useStaticQuery(graphql`
    query PagesMenu {
      allWpPage {
        edges {
          node {
            id
            uri
            title
            wpChildren {
              nodes {
                id
                uri
              }
            }
            ancestors {
              nodes {
                id
                uri
              }
            }
          }
        }
      }
    }
  `);

  const menus = data.allWpPage.edges
    .map((edge) => edge.node)
    .filter((node) => node.uri !== '/bienvenidos/')
    .filter((node) => node.ancestors === null);

  return { menus };
};
