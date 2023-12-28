// apps/client/src/app/(browse)/(with-layout)/products/new-filter-component.tsx
'use client';

import { Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment, Suspense, useContext, useEffect, useState } from 'react';
// import MobileFilterMenu from './mobile-filter-menu';
import { Checkbox } from '@/components/ui/checkbox';
// import { FiltersContext } from '@/contexts/filters-context-old';
import { FiltersContext, sortOptions } from '@/contexts/filter-context';
import { useSearchParams } from 'next/navigation';
import { capitalizeFirstLetter } from '@/lib/utils';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ProductSection({ products }: { products: any }) {
  return (
    <section
      aria-labelledby="products-heading"
      className="mx-auto max-w-2xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:max-w-7xl lg:px-8 "
    >
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <Suspense fallback={<p>loading products...</p>}>
          {products.map((product) => (
            <>
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imgS3Url}
                    alt={product.imgS3Url}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </Link>
            </>
          ))}
        </Suspense>
      </div>
    </section>
  );
}

function Dropdown({
  handleSortBy,
  selectedSortOption,
}: {
  handleSortBy: any;
  selectedSortOption: any;
}) {
  return (
    <Menu as="div" className="ml-40 relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Sort by: {selectedSortOption.name}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.allIds.map((optionId) => (
              <Menu.Item key={optionId}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active
                        ? 'bg-gray-100 text-gray-900 text-red-500'
                        : 'text-gray-700',
                      'block px-4 py-2 text-sm cursor-pointer',
                    )}
                    onClick={(e) => handleSortBy(e, sortOptions.byId[optionId])}
                  >
                    {sortOptions.byId[optionId].name}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function NewFilterComponent({
  normalizedFilterData,
}: {
  normalizedFilterData: any;
}) {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    filters,
    handleFilterChecked,
    replaceAllFilters,
    handleSort,
    handleRange,
    selectedSortOption,
    setSelectedSortOption,
    selectedPriceMin,
    selectedPriceMax,
    selectedBpmMin,
    selectedBpmMax,
  } = useContext(FiltersContext);

  async function fetchAndProcessData() {
    const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

    const res = await fetch(
      `${BASE_URL}/search/test?${searchParams.toString()}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const { data } = await res.json();

    if (!data) {
      setLoading(false);
      return;
    }

    setProducts(data.products);
    setLoading(false);
  }

  useEffect(() => {
    fetchAndProcessData();
  }, [searchParams]);

  useEffect(() => {
    replaceAllFilters(normalizedFilterData);
  }, []);

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: any,
    optionId: any,
  ) => {
    const isChecked = event.target.checked;
    handleFilterChecked(categoryId, optionId, isChecked);
  };

  const handleSortBy = (e, option) => {
    setSelectedSortOption(option);
    handleSort({ sortby: option.id, order: option.order });
    // return;
  };

  // const handleFormSubmit = (e: React.FormEvent<HTMLElement>) => {
  const handleFormSubmit = (formData, categoryId) => {
    // e.preventDefault();

    const minValue = formData.get('minValue');
    const maxValue = formData.get('maxValue');
    const id = capitalizeFirstLetter(categoryId.replace('Range', ''));

    handleRange({ id, min: minValue, max: maxValue });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!normalizedFilterData || !filters) {
    return <div>No data available</div>;
  }

  const categories = filters.entities.categories;

  return (
    <div className="text-black">
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
                      {sortOptions.allIds.map((optionId) => (
                        <Menu.Item key={optionId}>
                          {({ active }) => (
                            <div
                              // href={option.href}
                              className={classNames(
                                sortOptions.byId[optionId].current
                                  ? // option.current
                                    'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm cursor-pointer',
                              )}
                              // onClick={() => handleSortParam(option)}
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
                    {filters?.result?.map((categoryId) => (
                      // {Object.entries(filters?.entities?.categories).map(
                      //   ([categoryId, category]) => (
                      <Popover
                        key={categoryId}
                        className="relative inline-block px-4 text-left"
                      >
                        <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          {/* @ts-ignore */}
                          <span className="text-pink-500">
                            {categories[categoryId].name}
                          </span>
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

                            <form className="space-y-4 ">
                              {categories[categoryId].options.map(
                                (optionId) => {
                                  return (
                                    <div key={`${categoryId}-${optionId}`}>
                                      {/*  */}
                                      {categoryId
                                        .toLowerCase()
                                        .includes('range') ? (
                                        <>
                                          <div>
                                            {categories[
                                              categoryId
                                            ].name.toLowerCase()}
                                          </div>
                                          <div className="text-black">
                                            {/* <form action={handleFormSubmit}> */}
                                            <form
                                              action={(formData) =>
                                                handleFormSubmit(
                                                  formData,
                                                  categoryId,
                                                )
                                              }
                                            >
                                              <input
                                                name="minValue"
                                                type="number"
                                                defaultValue={
                                                  categoryId.includes('price')
                                                    ? selectedPriceMin
                                                    : selectedBpmMin
                                                }
                                                data-input-counter
                                                data-input-counter-min="1"
                                                placeholder={
                                                  categories[categoryId]
                                                    .options[0]
                                                }
                                                className="w-20"
                                              />
                                              <input
                                                defaultValue={
                                                  categoryId.includes('price')
                                                    ? selectedPriceMax
                                                    : selectedBpmMax
                                                }
                                                name="maxValue"
                                                type="number"
                                                placeholder={
                                                  categories[categoryId]
                                                    .options[1]
                                                }
                                                className="w-20"
                                              />
                                              <button type="submit">
                                                Apply
                                              </button>
                                            </form>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <>
                                            {/* <Checkbox
                                                    name={`${optionId}`}
                                                    defaultChecked={
                                                      categories[categoryId]
                                                        .checked
                                                    }
                                                    // id={`${category}-${filterId}`}
                                                    id={optionId}
                                                    defaultValue={
                                                      categories[categoryId]
                                                        .checked
                                                    }
                                                    // onCheck={(checked) =>
                                                    //   handleUpdateFilters(
                                                    //     categoryId,
                                                    //     filterId,
                                                    //     checked,
                                                    //   )
                                                    // }
                                                  >
                                                    {optionId}
                                                  </Checkbox> */}

                                            <div
                                              key={optionId}
                                              // className="pl-5"
                                            >
                                              <input
                                                type="checkbox"
                                                id={optionId}
                                                checked={
                                                  filters.entities.options[
                                                    optionId
                                                  ]?.checked || false
                                                }
                                                onChange={(e) =>
                                                  handleClick(
                                                    e,
                                                    categoryId,
                                                    optionId,
                                                  )
                                                }
                                              />
                                              <label
                                                htmlFor={optionId}
                                                className="pl-2"
                                              >
                                                {filters.entities.options[
                                                  optionId
                                                ]?.label.toLowerCase()}
                                              </label>
                                            </div>
                                          </>
                                        </>
                                      )}
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

      <ProductSection products={products} />
    </div>
  );
}
export default NewFilterComponent;
