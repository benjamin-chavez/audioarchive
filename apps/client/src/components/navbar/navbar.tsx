// frontend/app/components/navbar.tsx
'use client';

import { Fragment, useEffect, useState } from 'react';
// import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import {
  MagnifyingGlassIcon,
  // Bars3Icon,
  // MagnifyingGlassIcon,
  // QuestionMarkCircleIcon,
  UserIcon,
  ShoppingCartIcon,
  XMarkIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
// import Toast from './ui/toast';
// import { useMe } from '@/contexts/appUserContext';
import { getMe } from '@/lib/data/me';
import { useCart } from '@/contexts/cartContext';
import { authAdapter } from '@/lib/auth';
import { SearchBar } from './search-bar';
import Container from '../container';

// import { authAdapter } from '../lib/auth';

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
      name: 'Artists',
      href: '/app-users',
    },
    // {
    //   name: <ShoppingCart />,
    //   href: `/cart`,
    // },
  ],
  // anchorLinks: {
  //   loginItem: {
  //     name: 'Sign in',
  //     href: '/api/auth/login',
  //   },
  //   logoutItem: {
  //     name: 'Logout',
  //     href: '/api/auth/logout',
  //   },
  // },
  guestAppUserNavigation: {
    name: 'Sign in',
    href: '/api/auth/login',
    anchorTag: true,
  },
  authAppUserNavigation: [
    { name: 'Your Profile', href: '#' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Settings', href: '/dashboard/settings' },
    { name: 'Admin', href: '/a' },
    { name: 'Logout', href: '/api/auth/logout', anchorTag: true },
  ],
};

export function ShoppingCart() {
  const { totalItemQuantity: serverTotalItemQuantity } = useCart();
  const [clientTotalItemQuantity, setClientTotalItemQuantity] = useState(null);

  useEffect(() => {
    setClientTotalItemQuantity(serverTotalItemQuantity);
  }, [serverTotalItemQuantity]);

  return (
    <>
      <div className="group flex items-center h-full">
        <ShoppingCartIcon
          className="h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
        <span className="sr-only">items in cart, view bag</span>
        {clientTotalItemQuantity ? clientTotalItemQuantity : ''}
      </div>
    </>
  );
}

export default function Navbar() {
  const [me, setMe] = useState(null);
  const { user, isLoading, isAuthenticated } = authAdapter.useAppUser();
  // const { user, isLoading } = useUser();

  const { totalItemQuantity: serverTotalItemQuantity } = useCart();
  const [clientTotalItemQuantity, setClientTotalItemQuantity] = useState(null);

  useEffect(() => {
    setClientTotalItemQuantity(serverTotalItemQuantity);
  }, [serverTotalItemQuantity]);

  useEffect(() => {
    const handleGetMe = async (setMe: any) => {
      // if (!user || isLoading) {
      //   return;
      // }
      if (!isAuthenticated) {
        return;
      }

      const me = await getMe();
      setMe(me);
      return me;
    };

    handleGetMe(setMe);
  }, [user, isAuthenticated]);

  // let authNavItem = navItems.anchorLinks.loginItem;

  // if (!isLoading && user) {
  //   authNavItem = navItems.anchorLinks.logoutItem;
  // }

  // if (me) {
  //   // TODO: Uncomment this and refactor it - I think it has unnecsary rerenders.
  //   console.log(me);
  // }

  return (
    <div className="z-50">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
        {/* TODO: COMBINE THE THIS CONTAINER AND THE SUBSEQUENT DIV BY PASSING THE CLASSNAMES AS PROPS */}
        <Container>
          <div
            // max-w-screen-xl
            className="flex flex-wrap items-center justify-between mx-auto p-4"
          >
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {process.env.NEXT_PUBLIC_COMPANY_NAME}
                {/* {'process.env.NEXT_PUBLIC_COMPANY_NAME'} */}
              </span>
            </Link>

            <SearchBar />

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

                  {/* <a
                  key={authNavItem.href}
                  href={authNavItem.href}
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                >
                  {authNavItem.name}
                </a> */}

                  {!isLoading && user ? (
                    <Menu as="div" className="relative ">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>

                          <img
                            className="h-8 w-8 rounded-full"
                            // src={appUser.avatarS3Url}
                            // src={'/amin-chavez-avatar-seed.jpeg'}
                            // src={user?.picture}
                            src={me?.data?.avatarS3Url}
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
                          {navItems.authAppUserNavigation.map((item) =>
                            item.anchorTag ? (
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
                            ) : (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700',
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ),
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <a
                      key={navItems.guestAppUserNavigation.href}
                      href={navItems.guestAppUserNavigation.href}
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    >
                      {navItems.guestAppUserNavigation.name}
                    </a>
                  )}
                  <div className="flex flex-1 items-center justify-end ">
                    <div
                      // lg:ml-8
                      className="flex items-center "
                    >
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <a
                            href="#"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                        <div className="hidden lg:flex ">
                          <div className="p-2 -m-2">
                            <button
                              type="button"
                              // className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
                            >
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex ">
                          <a
                            href="/api/auth/login"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            // className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">Account</span>
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      <span
                        className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      <div className="flow-root">
                        <Link
                          href="/cart"
                          className="group -m-2 flex items-center p-2"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            {clientTotalItemQuantity
                              ? clientTotalItemQuantity
                              : ''}
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </div>
  );
}
