'use client';

import { FiltersContext } from '@/contexts/filter-context';
import { useContext, useEffect, useState } from 'react';

function ClientPage({ normalizedData }: { normalizedData: any }) {
  // console.log('data: ', JSON.stringify(normalizedData, null, 2));
  const {
    filters,
    setFilters,
    handleFilterChecked,
    replaceAllFilters,
    url,
    setInitialFilters,
  } = useContext(FiltersContext);
  // console.log(`URL: `, url);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   replaceAllFilters(normalizedData);
  // }, [normalizedData]);

  useEffect(() => {
    // setInitialFilters(normalizedData);
    replaceAllFilters(normalizedData);
  }, []);

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: any,
    optionId: any,
  ) => {
    const isChecked = event.target.checked;

    handleFilterChecked(categoryId, optionId, isChecked);
  };

  return (
    <>
      <div className="mt-20 bg-slate-800">
        <div>
          {Object.entries(filters?.entities?.categories).map(
            ([categoryId, category]) => (
              <div key={categoryId}>
                <div>{category.name}</div>
                {categoryId.toLowerCase().includes('range') ? (
                  <>
                    <input
                      type="number"
                      data-input-counter
                      data-input-counter-min="1"
                      // value={category.options[0]}
                      placeholder={category.options[0]}
                    />
                    <input type="number" placeholder={category.options[1]} />
                  </>
                ) : (
                  <div>
                    {category.options.map((optionId) => {
                      return (
                        <div key={optionId} className="pl-5">
                          <input
                            type="checkbox"
                            id={optionId}
                            // defaultValue={
                            //   filters.entities.options[optionId].checked ||
                            //   false
                            // }

                            checked={
                              filters.entities.options[optionId]?.checked ||
                              false
                            }
                            onChange={(e) =>
                              handleClick(e, categoryId, optionId)
                            }
                          />
                          <label htmlFor={optionId}>
                            <div>{`${filters.entities.options[optionId].checked}`}</div>
                            {filters.entities.options[optionId].label}
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
    </>
  );
}

export default ClientPage;
