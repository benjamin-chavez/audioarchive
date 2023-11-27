// frontend/app/components/navbar.tsx
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import {
  // Bars3Icon,
  // MagnifyingGlassIcon,
  // QuestionMarkCircleIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export type NavItem = {
  name: string;
};

const navItems = {
  nextLinks: [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Products',
      href: '/products',
    },
    {
      name: 'Users',
      href: '/search',
    },
    {
      name: 'Dashboard',
      href: `/dashboard`,
    },
    {
      name: 'Admin',
      href: `/a`,
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
};

export function ShoppingCart() {
  return (
    <>
      <div
        // className="ml-4 flow-root lg:ml-8"
        // className="flow-root"
        className="group flex items-center h-full"
      >
        {/* <a
          href="#"
          // className="group -m-2 flex items-center p-2"
          className="group -m-2 flex items-center p-2"
        > */}
        <ShoppingCartIcon
          className="h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
        {/* <span className="ml-2 text-sm font-medium">0</span> */}
        <span className="sr-only">items in cart, view bag</span>
        {/* </a> */}
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
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {process.env.NEXT_PUBLIC_COMPANY_NAME}
            </span>
          </Link>

          <div className="flex">
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
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
