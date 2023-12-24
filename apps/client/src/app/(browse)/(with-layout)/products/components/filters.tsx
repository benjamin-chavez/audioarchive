// apps/client/src/app/(browse)/products/filters.tsx

'use client';

import { Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
// import MobileFilterMenu from './mobile-filter-menu';
import { Checkbox } from '@/components/ui/checkbox';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function ActiveFilters({
  activeFilters,
  setActiveFilters,
}: {
  activeFilters: any;
  setActiveFilters: any;
}) {
  const handleRemoveFilter = (filterToRemove) => {
    const updatedFilters = activeFilters.filter(
      (filter) => filter !== filterToRemove,
    );

    setActiveFilters(updatedFilters);
  };

  return (
    <>
      {/* Active filters */}
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
          <h3 className="text-sm font-medium text-gray-500">
            Filters
            <span className="sr-only">, active</span>
          </h3>

          <div
            aria-hidden="true"
            className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
          />

          <div className="mt-2 sm:ml-4 sm:mt-0">
            <div className="-m-1 flex flex-wrap items-center">
              {activeFilters?.map((activeFilter) => (
                <span
                  key={activeFilter.value}
                  className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                >
                  {/* <span>{activeFilter.label}</span> */}
                  <span>{activeFilter}</span>
                  <button
                    type="button"
                    className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    onClick={() => handleRemoveFilter(activeFilter)}
                  >
                    <span className="sr-only">
                      Remove filter for {activeFilter.label}
                    </span>
                    <svg
                      className="h-2 w-2"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 8 8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        d="M1 1l6 6m0-6L1 7"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Filters({
  filters,
  filters1,
  sortOptions,
}: {
  filters: any;
  filters1: any;
  sortOptions: any;
}) {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [params, setParams] = useState(JSON.parse(JSON.stringify(filters)));
  const [sortQuery, setSortQuery] = useState(
    JSON.parse(JSON.stringify(sortOptions)),
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeFilters, setActiveFilters] = useState(() => {
    const uniqueFilters = new Set();
    for (const value of searchParams.values()) {
      uniqueFilters.add(value);
    }

    return Array.from(uniqueFilters);
  });

  // const [params, setParams] = useState(() => {
  //   return new URLSearchParams(searchParams as unknown as string);
  // });
  // const url = `${pathname}?${searchParams}`;

  useEffect(() => {
    const updatedFilters = () => {
      let updatedFilters;

      if (!searchParams.toString()) {
        updatedFilters = JSON.parse(JSON.stringify(filters));
      } else {
        updatedFilters = { ...params };
      }
      console.log(`sp: ${searchParams}`);

      searchParams.forEach((value, key) => {
        if (key === 'sort') {
          return;
        }

        updatedFilters[key]['options'][value].checked = true;
      });

      setParams(updatedFilters);
    };

    // console.log('searchParams', `${searchParams}`);
    // for (const value of searchParams.values()) {
    //   console.log(value);
    // }

    updatedFilters();
  }, [pathname, searchParams]);

  // /////////////////////

  const handleUpdateFilters = (section: any, option: any, checked: boolean) => {
    const locSearchParams: URLSearchParams = new URLSearchParams(
      searchParams as unknown as string,
    );

    // const locSearchParams: URLSearchParams = params;
    let uniqueFilters;

    if (checked) {
      locSearchParams.append(section, option);
      locSearchParams.sort();
      uniqueFilters = new Set([...activeFilters, option]);
      setActiveFilters(Array.from(uniqueFilters));
    } else {
      locSearchParams.delete(section, option);
      const updatedFilters = activeFilters.filter(
        (filter) => filter !== option,
      );
      setActiveFilters(updatedFilters);
    }

    router.push(`${pathname}?${locSearchParams}`);
  };

  const handleSortParam = (option) => {
    console.log(option);

    const updatedSortOptions = sortOptions.sort_by.map((sortBy) => {
      return (sortBy.current = sortBy.value === option.value ? true : false);
    });

    const locSearchParams: URLSearchParams = new URLSearchParams(
      searchParams as unknown as string,
    );

    locSearchParams.set('sort', option.value);

    router.push(`${pathname}?${locSearchParams}`);
  };

  // TODO: START HERE -> REFACTOR
  return (
    <>
      {/* <MobileFilterMenu
        filters={filters}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      /> */}
      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="border-b border-gray-200 bg-white pb-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.sort_by.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <div
                            // href={option.href}
                            className={classNames(
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm cursor-pointer',
                            )}
                            onClick={() => handleSortParam(option)}
                          >
                            {option.name}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters
            </button>

            <div className="hidden sm:block">
              <div className="flow-root">
                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                  {Object.entries(params).map(([sectionKey, sectionVal]) => (
                    <Popover
                      key={sectionKey}
                      className="relative inline-block px-4 text-left"
                    >
                      <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>{sectionVal['name']}</span>
                        {/* {sectionIdx === 0 ? ( */}
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          {/* {sectionKey} */}1
                        </span>
                        {/* ) : null} */}
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <form className="space-y-4">
                            {Object.entries(sectionVal.options).map(
                              ([key1, val1]) => {
                                return (
                                  <div
                                    // key={key1}
                                    key={`${sectionKey}-${key1}`}
                                  >
                                    <Checkbox
                                      // id={`filter-${section.id}-${optionIdx}`}
                                      name={`${key1}[]`}
                                      // defaultValue={option.value}
                                      defaultChecked={val1['checked']}
                                      // id={`${sectionKey}-${val1['label']}`}
                                      id={`${sectionKey}-${key1}`}
                                      defaultValue={val1['checked']}
                                      // onCheck={(checked) =>
                                      //   handleUpdateFilters(
                                      //     sectionKey,
                                      //     key1,
                                      //     val1['checked'],
                                      //   )
                                      // }
                                      onCheck={(checked) =>
                                        handleUpdateFilters(
                                          sectionKey,
                                          key1,
                                          // val1['checked'],
                                          checked,
                                        )
                                      }
                                    >
                                      {/* {option.label} */}
                                      {key1}
                                    </Checkbox>
                                  </div>
                                );
                              },
                            )}
                          </form>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                </Popover.Group>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        <ActiveFilters
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </section>
    </>
  );
}
