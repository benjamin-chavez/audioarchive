// 'use client';
import 'server-only';

import { Hero } from '@/components/hero';
import { Badge } from '@/components/ui/badge';
import Badge2 from '@/components/ui/badge2';
// import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import {
//   Bars3Icon,
//   MagnifyingGlassIcon,
//   QuestionMarkCircleIcon,
//   ShoppingBagIcon,
//   XMarkIcon,
// } from '@heroicons/react/24/outline';
// import { Fragment, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000';

export default function Client() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main
      // bg-white
      className="-z-50"
    >
      <div className="w-10"></div>
      <Hero />
    </main>
  );
}
