// apps/client/src/app/normalizr/client-page.tsx
'use client';

import Container from '@/components/container';
import { FiltersContext, sortOptions } from '@/contexts/filter-context';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'next/navigation';
import { Fragment, useContext, useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
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

function ClientPage({ normalizedFilterData }: { normalizedFilterData: any }) {
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
    <Container>
      <h1>Normalizr CLIENT Page</h1>

      <div className="mt-20 bg-slate-800">
        <div>
          {filters?.result?.map((categoryId) => (
            <div key={categoryId}>
              {categoryId.toLowerCase().includes('range') ? (
                <>
                  <div>{categories[categoryId].name}</div>
                  <div className="text-black">
                    {/* <form action={handleFormSubmit}> */}
                    <form
                      action={(formData) =>
                        handleFormSubmit(formData, categoryId)
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
                        placeholder={categories[categoryId].options[0]}
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
                        placeholder={categories[categoryId].options[1]}
                        className="w-20"
                      />
                      <button type="submit">Apply</button>
                    </form>
                  </div>
                </>
              ) : (
                <div>
                  <div>{categories[categoryId].name}</div>
                  {categories[categoryId].options.map((optionId) => {
                    return (
                      <div key={optionId} className="pl-5">
                        <input
                          type="checkbox"
                          id={optionId}
                          checked={
                            filters.entities.options[optionId]?.checked || false
                          }
                          onChange={(e) => handleClick(e, categoryId, optionId)}
                        />
                        <label htmlFor={optionId} className="pl-2">
                          {filters.entities.options[optionId]?.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Dropdown
        handleSortBy={handleSortBy}
        selectedSortOption={selectedSortOption}
        // @ts-ignore
        setSelectedSortOption={setSelectedSortOption}
      />
      <div>
        {products?.map((product) => <div key={product.id}>{product.name}</div>)}
      </div>
    </Container>
  );
}

export default ClientPage;