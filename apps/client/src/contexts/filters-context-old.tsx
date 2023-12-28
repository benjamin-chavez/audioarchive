// apps/client/src/contexts/filter-context.tsx

import {
  FilterItem,
  FiltersByCategory,
  getInitialFilters,
} from '@/lib/filters';
import { normalizedData_OPTION1 } from '@/lib/normalize';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { createContext, useReducer, useState } from 'react';

type FiltersState = {
  filterItems: any;

  selectedFiltersByCategory: any;
  deselectAllFilters: any;
  addSelectedFilter: any;
  removeSelectedFilter: any;
};

const FiltersContext = createContext({} as FiltersState);

const FiltersProvider = ({ children }) => {
  const [filterItems, setFilterItems] =
    useState<FiltersByCategory>(getInitialFilters());

  const [selectedFiltersByCategory, setSelectedFiltersByCategory] = useState(
    {},
  );

  const addSelectedFilter = (category, filterId) => {
    // TODO: implement uniqueness check
    // uniqueFilters = new Set([...selectedFilters, filterId]);

    const updatedSelectedFilters = {
      ...selectedFiltersByCategory,
      [category]: selectedFiltersByCategory.hasOwnProperty(category)
        ? [...selectedFiltersByCategory[category], filterId]
        : [filterId],
    };

    setSelectedFiltersByCategory(updatedSelectedFilters);

    let updatedFilterItems = { ...filterItems };
    Object.entries(updatedSelectedFilters).forEach(
      ([categoryKey, filterVal]) => {
        console.log('filterVal', filterVal);

        filterVal.forEach((filterId) => {
          const itemIdx = updatedFilterItems[categoryKey].findIndex(
            (item) => item.id === filterId,
          );

          if (itemIdx !== -1) {
            updatedFilterItems[categoryKey][itemIdx].checked = true;
          }
        });
      },
    );

    setFilterItems(updatedFilterItems);
  };

  const removeSelectedFilter = (category, filterId) => {
    const updatedCategoryFilters = selectedFiltersByCategory[category]?.filter(
      (item) => item !== filterId,
    );

    const updatedSelectedFilters = {
      ...selectedFiltersByCategory,
      [category]: updatedCategoryFilters,
    };

    // setSelectedFiltersByCategory(updatedSelectedFilters);
    setSelectedFiltersByCategory(normalizedData_OPTION1);

    let updatedFilterItems = { ...filterItems };

    const itemIdx = updatedFilterItems[category].findIndex(
      (item) => item.id === filterId,
    );
    updatedFilterItems[category][itemIdx].checked = false;

    setFilterItems(updatedFilterItems);
  };

  // const updateFilters = (
  //   category: any,
  //   filter: FilterItem,
  //   checked: boolean,
  //   searchParams: ReadonlyURLSearchParams,
  // ) => {
  //   const locSearchParams: URLSearchParams = new URLSearchParams(
  //     searchParams as unknown as string,
  //   );

  //   // const locSearchParams: URLSearchParams = params;
  //   let uniqueFilters;

  //   if (checked) {
  //     locSearchParams.append(category, option);
  //     locSearchParams.sort();
  //     uniqueFilters = new Set([...selectedFilters, option]);
  //     setSelectedFilters(Array.from(uniqueFilters));
  //   } else {
  //     locSearchParams.delete(category, option);
  //     const updatedFilters = selectedFilters.filter(
  //       (filter) => filter !== option,
  //     );
  //     setSelectedFilters(updatedFilters);
  //   }

  //   router.push(`${pathname}?${locSearchParams}`);
  // };

  const deselectAllFilters = (filters) => {
    // setSelectedFiltersByCategory({});

    // setFilterItems(
    //   // @ts-ignore
    //   Object.fromEntries(
    //     Object.entries(filters).map(([key, value]) => [
    //       key,
    //       // @ts-ignore
    //       value.map((filter) => ({ ...filter, checked: false })),
    //     ]),
    //   ),
    // );
    // @ts-ignore
    setFilterItems(normalizedData_OPTION1);
  };

  const value = {
    filterItems,

    selectedFiltersByCategory,
    deselectAllFilters,
    // updateFilters,
    addSelectedFilter,
    removeSelectedFilter,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

default FiltersProvider;
