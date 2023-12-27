// apps/client/src/app/(browse)/products/filters.tsx

'use client';

import { Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Fragment, useContext, useEffect, useState } from 'react';
// import MobileFilterMenu from './mobile-filter-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { FiltersContext } from '@/contexts/filters-context';
import { FilterItem } from '@/lib/filters';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// const printSearchParams = (searchParams: ReadonlyURLSearchParams) => {
//   console.log('searchParams', `${searchParams}`);

//   for (const value of searchParams.values()) {
//     console.log(value);
//   }
// };

///////////

// const [activeFilters, setActiveFilters] = useState(() => {
//   const uniqueFilters = new Set();
//   for (const value of searchParams.values()) {
//     uniqueFilters.add(value);
//   }

//   return Array.from(uniqueFilters);
// });

// const [params, setParams] = useState(() => {
//   return new URLSearchParams(searchParams as unknown as string);
// });
// const url = `${pathname}?${searchParams}`;

export function SelectedFilters({}: {}) {
  const { filterItems, selectedFilters, deselectAllFilters } =
    useContext(FiltersContext);

  const handleRemoveFilter = (filterToRemove) => {
    const updatedFilters = selectedFilters.filter(
      (filter) => filter !== filterToRemove,
    );

    setSelectedFilters(updatedFilters);
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
              {selectedFilters?.map((activeFilter) => (
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
// const [sortQuery, setSortQuery] = useState(
//   JSON.parse(JSON.stringify(sortOptions)),
// );
// const [params, setParams] = useState(JSON.parse(JSON.stringify(filters)));

export function Filters({ sortOptions }: { sortOptions: any }) {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const {
    filterItems: filters,
    selectedFiltersByCategory,
    deselectAllFilters,
    addSelectedFilter,
    removeSelectedFilter,
  } = useContext(FiltersContext);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [url, setUrl] = useState<string>(`${pathname}?${searchParams}`);

  // useEffect(() => {
  //   const updatedFilters = () => {
  //     let updatedFilters;

  //     if (!searchParams.toString()) {
  //       updatedFilters = JSON.parse(JSON.stringify(filters));
  //     } else {
  //       updatedFilters = { ...params };
  //     }
  //     console.log(`sp: ${searchParams}`);

  //     searchParams.forEach((value, key) => {
  //       if (key === 'sort') {
  //         return;
  //       }

  //       updatedFilters[key]['options'][value].checked = true;
  //     });

  //     setParams(updatedFilters);
  //   };

  //   updatedFilters();
  // }, [pathname, searchParams]);

  const handleUpdateFilters = (
    category: any,
    filterId: string,
    checked: boolean,
  ) => {
    const locSearchParams: URLSearchParams = new URLSearchParams(
      searchParams as unknown as string,
    );

    if (checked) {
      locSearchParams.append(category, filterId);
      locSearchParams.sort();
      addSelectedFilter(category, filterId);
    } else {
      locSearchParams.delete(category, filterId);
      removeSelectedFilter(category, filterId);
    }

    router.push(`${pathname}?${locSearchParams}`);
  };

  // useEffect(() => {
  //   setUrl(`${pathname}?${searchParams}`);

  // }, [pathname, searchParams]);

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

        {/* HERE */}
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
                  {Object.entries(filters).map(([category, filterItems]) => (
                    <Popover
                      key={category}
                      className="relative inline-block px-4 text-left"
                    >
                      <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>{category}</span>
                        {/* {sectionIdx === 0 ? ( */}
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          1{/* {category} */}
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
                          {/* HERE */}

                          <form className="space-y-4">
                            {Object.entries(filterItems).map(
                              ([idx, filterItem]) => {
                                return (
                                  <div key={`${category}-${filterItem.id}`}>
                                    <Checkbox
                                      name={`${filterItem.id}[]`}
                                      defaultChecked={filterItem.checked}
                                      id={`${category}-${filterItem.id}`}
                                      defaultValue={filterItem.checked}
                                      onCheck={(checked) =>
                                        handleUpdateFilters(
                                          category,
                                          filterItem.id,
                                          checked,
                                        )
                                      }
                                    >
                                      {filterItem['label']}
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
        {/* <SelectedFilters /> */}
      </section>
    </>
  );
}
