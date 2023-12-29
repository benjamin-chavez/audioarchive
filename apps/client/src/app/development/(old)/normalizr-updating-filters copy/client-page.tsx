'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useContext, useEffect, useState } from 'react';
import { normalize, schema } from 'normalizr';
import { modifyData } from '@/lib/normalize';
import Container from '@/components/container';
import { useSearchParams } from 'next/navigation';
import { FiltersContextUpdatingFilters } from '@/contexts/filter-context-updating-filters';

const sortOptions = [
  { id: 'alphabetical', name: 'Alphabetical', actie: false },
  {
    id: 'alphabetical__desc',
    name: 'Alphabetical Descending',
    href: '#',
    actie: false,
  },
  // { name: 'Most Popular', href: '#', current: true },
  // { name: 'Best Rating', href: '#', current: false },
  // { name: 'Newest', href: '#', current: false },
  // { name: 'Price: Low to High', href: '#', current: false },
  // { name: 'Price: High to Low', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Dropdown({
  handleSortBy,
  option,
}: {
  handleSortBy: any;
  option: any;
}) {
  return (
    <Menu as="div" className="ml-40 relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
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

function ClientPage() {
  const [normalizedData, setNormalizedData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filters, setFilters, handleFilterChecked, replaceAllFilters, url } =
    useContext(FiltersContextUpdatingFilters);
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState('alphabetical');

  async function fetchAndProcessData() {
    const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
    // console.log(`searchParams: ${searchParams}`);
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
    setNormalizedData(normalize(modifiedData, [category]));
    setLoading(false);
  }

  // useEffect(() => {
  //   fetchAndProcessData();
  // }, []);

  useEffect(() => {
    fetchAndProcessData();
  }, [searchParams]);

  useEffect(() => {
    if (normalizedData) {
      replaceAllFilters(normalizedData);
    }
  }, [normalizedData]);

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: any,
    optionId: any,
  ) => {
    const isChecked = event.target.checked;

    handleFilterChecked(categoryId, optionId, isChecked);
    // setLoading(true);
    // fetchAndProcessData();
  };

  const handleSortBy = (e, option) => {
    console.log(option);
    handleFilterChecked('sortby', option.name, true);
    return;
  };

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (!normalizedData || !filters) {
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
                    <input
                      type="number"
                      data-input-counter
                      data-input-counter-min="1"
                      placeholder={category.options[0]}
                    />
                    <input type="number" placeholder={category.options[1]} />
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
      {/* <Dropdown handleSortBy={handleSortBy} /> */}
      <div>
        {products?.map((product) => <div key={product.id}>{product.name}</div>)}
      </div>
    </Container>
  );
}

export default ClientPage;
