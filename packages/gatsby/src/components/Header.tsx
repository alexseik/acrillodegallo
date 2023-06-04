import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Logo from './Logo';

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

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menus = data.allWpPage.edges;

  return (
    <header>
      <div className="flex w-full items-center">
        <Logo />
      </div>
      <nav className="bg-white px-6 py-4">
        <div className="flex justify-between">
          <div className="md:hidden" onClick={toggleMenu}>
            <button className="text-black">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M4 4h16v2H4V4zm0 8h16v2H4v-2zm0 8h16v2H4v-2z"
                  ></path>
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16v2H4V5zm0 8h16v2H4v-2zm0 8h16v2H4v-2z"
                  ></path>
                )}
              </svg>
            </button>
          </div>
          <div
            className={`md:flex  ${
              isOpen ? 'block' : 'hidden'
            } w-full md:justify-center`}
          >
            {menus.map((menu) => (
              <Link
                key={menu.node.id}
                className="mx-3 mt-2 text-sm uppercase text-orange-500 md:mt-0"
                to={menu.node.uri ? menu.node.uri : '/'}
              >
                {menu.node.title}
              </Link>
            ))}
            <Link
              className="mx-3 mt-2 text-sm uppercase text-orange-500 md:mt-0"
              to="/blog"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
