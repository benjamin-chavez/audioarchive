// apps/client/src/app/dashboard/sidebar.tsx

'use client';

import {
  UsersIcon,
  // HomeIcon,
  // UserGroupIcon,
  AdjustmentsVerticalIcon,
  RadioIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const currentPath = usePathname();

  const navigation = [
    {
      name: 'Products',
      href: '/products',
      // icon: AdjustmentsVerticalIcon,
      icon: MusicalNoteIcon,
      current: currentPath === '/browse/products',
    },
    {
      name: 'Artists',
      href: '/app-users',
      icon: UsersIcon,
      current: currentPath === '/browse/app-users',
    },
    {
      name: 'Categories',
      href: '/cats3',
      icon: RadioIcon,
      current: currentPath === '/browse/app-users',
    },
    {
      name: 'Mix',
      href: '/development/products--copy',
      icon: AdjustmentsVerticalIcon,
      current: currentPath === '/development/products--copy',
    },
  ];

  return (
    <div
      // max-w-7xl
      // bg-gray-900/70
      className="flex grow flex-col max-w-[200px] gap-y-5 overflow-y-auto  px-6  w-full bg-white border-gray-200 dark:bg-gray-900 "
    >
      <div className="flex h-10 shrink-0 items-center"></div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Browse
            </div>
            <div className="mt-2">
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li
                    key={item.name}
                    // onClick={() => handleNavigationChange(item.href)}
                  >
                    <Link
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                      )}
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
