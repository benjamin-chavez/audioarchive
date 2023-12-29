'use client';

// import { FiltersContext } from '@/contexts/filters-context-old';
import {
  normalizedData_OPTION1,
  normalizedData_OPTION2,
} from '@/lib/normalize';
import { useContext, useState } from 'react';

export function Normalizr() {
  console.log(
    'normalizedData_OPTION1: ',
    JSON.stringify(normalizedData_OPTION1, null, 2),
  );
  // console.log(
  //   'normalizedData_OPTION2: ',
  //   JSON.stringify(normalizedData_OPTION2, null, 2),
  // );
  const [filters, setFilters] = useState(normalizedData_OPTION1);
  const handleClick = (event: React.MouseEvent<HTMLInputElement>, cat: any) => {
    // Call the onCheck prop with the new checked state
    console.log(cat);
    const updatedFilters = { ...filters };
    updatedFilters.entities.options[cat].checked =
      !filters.entities.options[cat].checked;

    setFilters(updatedFilters);
  };

  console.log(JSON.stringify(filters.entities.categories));
  return (
    <div>
      <h1>Normalizr</h1>

      {Object.entries(filters.entities.categories).map(
        ([categoryId, category]) => (
          <div key={categoryId}>
            <div>{category.name}</div>
            <div>
              {category.options.map((cat) => {
                return (
                  <div key={cat} className="pl-5">
                    {/* <div className="pl-5 text-red-500 bg-gray-500">
                      {filters.entities.options[cat].label}
                    </div>
                    <div className="pl-10 text-red-500 bg-gray-500">
                      {filters.entities.options[
                        cat
                      ].checked.toString()}
                    </div> */}
                    <input
                      type="checkbox"
                      id={cat}
                      defaultChecked={filters.entities.options[cat].checked}
                      onClick={(e) => handleClick(e, cat)}
                    />
                    <label htmlFor={cat}>
                      {filters.entities.options[cat].label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

export function Normalizr2() {
  const {
    filterItems: filters,
    selectedFiltersByCategory,
    deselectAllFilters,
    addSelectedFilter,
    removeSelectedFilter,
  } = useContext(FiltersContext);

  // const handleClick = (event: React.MouseEvent<HTMLInputElement>, cat: any) => {
  //   // Call the onCheck prop with the new checked state
  //   console.log(cat);
  //   const updatedFilters = { ...filters };
  //   updatedFilters.entities.options[cat].checked =
  //     !filters.entities.options[cat].checked;

  //   setFilters(updatedFilters);
  // };

  const handleUpdateFilters = (
    category: any,
    filterId: string,
    checked: boolean,
  ) => {
    console.log('category', category);
    console.log('filterId', filterId);
    console.log('checked', checked);
    if (checked) {
      addSelectedFilter(category, filterId);
    } else {
      removeSelectedFilter(category, filterId);
    }
  };

  return (
    <div>
      <h1>Normalizr2</h1>
      <div>
        {Object.entries(filters).map(([category, filterItems]) => (
          <div key={category}>
            {category.toUpperCase()}

            <div className="pl-5">
              {/* HERE */}

              <form className="space-y-4">
                {Object.entries(filterItems).map(([idx, filterItem]) => {
                  return (
                    <div key={`${category}-${filterItem.id}`}>
                      {/* <Checkbox
                        name={`${filterItem.id}[]`}
                        defaultChecked={filterItem.checked}
                        id={`${category}-${filterItem.id}`}
                        defaultValue={filterItem.checked}
                        onCheck={(checked) =>
                          handleUpdateFilters(category, filterItem.id, checked)
                        }
                      >
                        {filterItem['label']}
                      </Checkbox> */}
                      <input
                        type="checkbox"
                        id={`${category}-${filterItem.id}`}
                        defaultChecked={filterItem.checked}
                        // onClick={(e) => handleClick(e, category)}
                        onClick={(e) =>
                          handleUpdateFilters(
                            category,
                            filterItem.id,
                            filterItem.checked,
                          )
                        }
                        // onClick={(checked) =>
                        //   handleUpdateFilters(category, filterItem.id, checked)
                        // }
                      />
                      <label htmlFor={`${category}-${filterItem.id}`}>
                        {filterItem['label']}
                      </label>
                    </div>
                  );
                })}
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Page() {
  return (
    <>
      <div className="mt-20 bg-slate-800">
        <Normalizr2 />
      </div>
      <div className="mt-20 bg-slate-800">
        <Normalizr />
      </div>
    </>
  );
}
export default Page;
