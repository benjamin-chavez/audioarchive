'use client';

import { FiltersContext } from '@/contexts/filter-context';
import { useContext, useEffect, useState } from 'react';
import { normalize, schema } from 'normalizr';
import { modifyData } from '@/lib/normalize';
import Container from '@/components/container';
import { useSearchParams } from 'next/navigation';

function ClientPage() {
  const [normalizedData, setNormalizedData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filters, setFilters, handleFilterChecked, replaceAllFilters, url } =
    useContext(FiltersContext);
  const searchParams = useSearchParams();

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
      <div>
        {products?.map((product) => <div key={product.id}>{product.name}</div>)}
      </div>
    </Container>
  );
}

export default ClientPage;
