// apps/client/src/app/(browse)/layout.tsx

// apps/client/src/app/(browse2)/layout.tsx
'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Container from '@/components/container';
import Sidebar from './components/sidebar';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function SidebarNavigation({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="h-full">
        {/* Static sidebar for desktop */}

        <main
          // py-10
          className=" lg:pl-64"
        >
          <div
          // className=" sm:px-6 lg:px-8"
          >
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section
    // className="h-full"
    >
      <Container>
        <div className="">
          <div className="flex">
            <Sidebar />

            <div className="h-full w-full">
              {/* Static sidebar for desktop */}

              <main
              // py-10
              // className=" lg:pl-64"
              >
                <div
                // className=" sm:px-6 lg:px-8"
                >
                  {children}
                </div>
              </main>
            </div>
          </div>

          {/* {children} */}
        </div>
      </Container>
    </section>
  );
}
