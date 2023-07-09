import React, { Fragment, useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'gatsby';
import { usePagesMenu } from '../hooks/menus';

const MenuMobile = () => {
  const { menus, active } = usePagesMenu();

  return (
    <div className="right-0 mt-2">
      <Menu>
        {({ open, close }) => (
          <>
            <Menu.Button>
              {!open && (
                <Bars3Icon className="bg-transaprent h-6 w-6 cursor-pointer rounded-md font-bold text-black hover:bg-orange-500 md:hidden" />
              )}
              {open && (
                <XMarkIcon
                  onClick={close}
                  className="bg-transaprent h-6 w-6 cursor-pointer rounded-md font-bold text-black hover:bg-orange-500 md:hidden"
                />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-5 z-10 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    <Link
                      className={`${
                        active === '/' ? 'text-orange-900' : 'text-orange-500'
                      }`}
                      to="/"
                    >
                      Inicio
                    </Link>
                  </Menu.Item>
                  {menus.map((link) => (
                    <Menu.Item>
                      {() => (
                        <Link
                          className={`${
                            active === link.uri
                              ? 'text-orange-900'
                              : 'text-orange-500'
                          }`}
                          to={link.uri ? link.uri : '/'}
                        >
                          <div className="py-1">{link.title}</div>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    <Link
                      className={`${
                        active === '/blog/'
                          ? 'text-orange-900'
                          : 'text-orange-500'
                      }`}
                      to="/blog"
                    >
                      <div className="py-1">Blog</div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      className={`${
                        active === '/proyectos-y-actividades/loteria/'
                          ? 'text-orange-900'
                          : 'text-orange-500'
                      }`}
                      to="/proyectos-y-actividades/loteria"
                    >
                      <div className="py-1">Lotería</div>
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default MenuMobile;
