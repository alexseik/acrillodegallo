import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Logo from './Logo';
import MenuMobile from './MenuMobile';

const Header = () => {
  const data: Queries.HeaderQueryQuery = useStaticQuery(graphql`
    query HeaderQuery {
      allWpPage {
        edges {
          node {
            id
            uri
            title
          }
        }
      }
    }
  `);

  const menus = data.allWpPage.edges.map((edge) => edge.node);

  return (
    <header>
      <div className="flex w-full items-center justify-between">
        <div className="w-72">
          <Logo />
        </div>
        <div className="px-4 md:hidden">
          <MenuMobile links={menus} />
        </div>
      </div>
      <nav className="hidden bg-white px-6 py-4 md:block">
        <div className="flex justify-center">
          {menus.map((menu) => (
            <Link
              key={menu.id}
              className="mx-3 mt-2 text-sm uppercase text-orange-500 md:mt-0"
              to={menu.uri ? menu.uri : '/'}
            >
              {menu.title}
            </Link>
          ))}
          <Link
            className="mx-3 mt-2 text-sm uppercase text-orange-500 md:mt-0"
            to="/blog"
          >
            Blog
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
