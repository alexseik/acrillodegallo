import { graphql, useStaticQuery } from 'gatsby';
import { useEffect, useState } from 'react';

export const usePagesMenu = () => {
  const [active, setActive] = useState<string>('');

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

  if (typeof window !== 'undefined') {
    useEffect(() => {
      setActive(window.location.pathname);
      console.log({ active: window.location.pathname });
    }, [window]);
  }

  return { menus, active };
};
