// frontend/app/components/navbar.tsx
'use client';

import { Fragment } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import {
  // Bars3Icon,
  // MagnifyingGlassIcon,
  // QuestionMarkCircleIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export type NavItem = {
  name: string;
};

const navItems = {
  nextLinks: [
    {
      name: 'Products',
      href: '/products',
    },
    {
      name: 'Users',
      href: '/search',
    },
    {
      name: <ShoppingCart />,
      href: `/cart`,
    },
  ],
  anchorLinks: {
    loginItem: {
      name: 'Login',
      href: '/api/auth/login',
    },
    logoutItem: {
      name: 'Logout',
      href: '/api/auth/logout',
    },
  },
  appUserNavigation: [
    { name: 'Your Profile', href: '#' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Settings', href: '/dashboard/settings' },
    { name: 'Admin', href: '/a' },
    { name: 'Logout', href: '/api/auth/logout' },
  ],
};

export function ShoppingCart() {
  return (
    <>
      <div className="group flex items-center h-full">
        <ShoppingCartIcon
          className="h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
        <span className="sr-only">items in cart, view bag</span>
      </div>
    </>
  );
}

export default function Navbar() {
  const { user, isLoading } = useUser();

  let authNavItem = navItems.anchorLinks.loginItem;

  if (!isLoading && user) {
    authNavItem = navItems.anchorLinks.logoutItem;
  }

  return (
    <div className="z-50">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {process.env.NEXT_PUBLIC_COMPANY_NAME}
              {/* {'process.env.NEXT_PUBLIC_COMPANY_NAME'} */}
            </span>
          </Link>

          <div className="flex ">
            <div className=" w-full md:block md:w-auto" id="navbar-default">
              <div className="flex gap-8">
                {navItems.nextLinks.map((item) => {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <a
                  key={authNavItem.href}
                  href={authNavItem.href}
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                >
                  {authNavItem.name}
                </a>

                <Menu as="div" className="relative ">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>

                      <img
                        className="h-8 w-8 rounded-full"
                        // src={appUser.avatarS3Url}
                        // src={'/amin-chavez-avatar-seed.jpeg'}
                        src={user?.picture}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {navItems.appUserNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
