'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FiltersContext } from '@/contexts/filter-context';
import { useContext, useEffect, useState } from 'react';
import { normalize, schema } from 'normalizr';
import { modifyData } from '@/lib/normalize';
import Container from '@/components/container';
import { useSearchParams } from 'next/navigation';

const sortOptions = [
  {
    id: 'featured',
    order: 'desc',
    name: 'Featured',
  },
  {
    id: 'price',
    order: 'asc',
    name: 'Price: Low to High',
  },
  {
    id: 'price',
    order: 'desc',
    name: 'Price: High to Low',
  },
  {
    id: 'rating',
    order: 'desc',
    name: 'Avg. Customer Review',
  },
  // {
  //   id: 'rating',
  //   order: 'desc',
  //   name: 'Rating',
  // },
  { id: 'date', order: 'desc', name: 'Newest Arrivals' },
  {
    id: 'sales',
    order: 'desc',
    name: 'Best Sellers',
  },

  // { id: 'date', order: 'asc', name: 'Oldest' },
  // { id: 'name', order: 'asc', name: 'Alphabetical A to Z', active: false },
  // {
  //   id: 'name',
  //   order: 'desc',
  //   name: 'Alphabetical Z to A',
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Dropdown({
  handleSortBy,
  selectedSortOption,
  setSelectedSortOption,
}: {
  handleSortBy: any;
  selectedSortOption: any;
  setSelectedSortOption: any;
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
            {sortOptions.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active
                        ? 'bg-gray-100 text-gray-900 text-red-500'
                        : 'text-gray-700',
                      'block px-4 py-2 text-sm cursor-pointer',
                    )}
                    onClick={(e) => handleSortBy(e, option)}
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
  );
}

function ClientPage({ normalizedFilterData }: { normalizedFilterData: any }) {
  const [products, setProducts] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState({
    id: 'featured',
    order: 'desc',
    name: 'Featured',
  });
  const [loading, setLoading] = useState(true);
  const {
    filters,
    setFilters,
    handleFilterChecked,
    replaceAllFilters,
    url,
    handleSort,
  } = useContext(FiltersContext);
  const searchParams = useSearchParams();

  async function fetchAndProcessData() {
    const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
    const res = await fetch(`${BASE_URL}/search/test?${searchParams}`);

    if (!res.ok) {
      // Handle error appropriately
      throw new Error('Failed to fetch products');
    }

    const { data } = await res.json();

    if (!data) {
      setLoading(false);
      return;
    }

    const modifiedData = modifyData(data.filters);
    // const bpmRangeEntity = new schema.Entity('bpmRange');
    const option = new schema.Entity('options');
    const category = new schema.Entity('categories', {
      options: [option],
    });

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
    return;
  };

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (!normalizedFilterData || !filters) {
    return <div>No data available</div>;
  }

  return (
    <Container>
      <h1>Normalizr CLIENT Page</h1>

      <div className="mt-20 bg-slate-800">
        <div>
          {Object.entries(filters?.entities?.categories).map(
            ([categoryId, category]) => (
              <div key={categoryId}>
                <div>{category.name}</div>
                {categoryId.toLowerCase().includes('range') ? (
                  <div className="text-black">
                    <form action="">
                      <input
                        type="number"
                        data-input-counter
                        data-input-counter-min="1"
                        placeholder={category.options[0]}
                        className="w-20"
                      />
                      <input
                        type="number"
                        placeholder={category.options[1]}
                        className="w-20"
                      />
                    </form>
                  </div>
                ) : (
                  <div>
                    {category.options.map((optionId) => {
                      return (
                        <div key={optionId} className="pl-5">
                          <input
                            type="checkbox"
                            id={optionId}
                            checked={
                              filters.entities.options[optionId]?.checked ||
                              false
                            }
                            onChange={(e) =>
                              handleClick(e, categoryId, optionId)
                            }
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
            ),
          )}
        </div>
      </div>
      <Dropdown
        handleSortBy={handleSortBy}
        selectedSortOption={selectedSortOption}
        setSelectedSortOption={setSelectedSortOption}
      />
      <div>
        {products?.map((product) => <div key={product.id}>{product.name}</div>)}
      </div>
    </Container>
  );
}

export default ClientPage;
