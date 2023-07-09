import React from 'react';
import { Link } from 'gatsby';
import Logo from './Logo';
import MenuMobile from './MenuMobile';
import { usePagesMenu } from '../hooks/menus';

const Header = () => {
  const { menus } = usePagesMenu();

  return (
    <header>
      <div className="flex w-full items-center justify-between">
        <div className="w-72 md:w-full">
          <Logo />
        </div>
        <div className="px-4 md:hidden">
          <MenuMobile />
        </div>
      </div>
      <nav className="hidden bg-white px-6 py-4 md:block">
        <div className="flex justify-center">
          <Link
            className="mx-3 mt-2 text-sm uppercase text-orange-500 md:mt-0"
            to="/"
          >
            Inicio
          </Link>
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
