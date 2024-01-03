// apps/client/src/contexts/filter-context.tsx

import { normalizedData_OPTION1 } from '@/lib/normalize';
import { produce } from 'immer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useState } from 'react';
// import { useImmer } from 'use-immer';

type FiltersState = {
  filters: any;
  toggleOption: any;
  handleFilterChecked: any;
  replaceAllFilters: any;
  handleSort: any;
  handleRange: (rangeDetails: { id: string; min: string; max: string }) => void;
  selectedSortOption: any;
  setSelectedSortOption: any;
  selectedPriceMin: string | null;

  selectedPriceMax: string | null;

  selectedBpmMin: string | null;

  selectedBpmMax: string | null;
};

export const FiltersContext = createContext({} as FiltersState);

export const sortOptions = {
  byId: {
    featured__desc: {
      id: 'featured',
      order: 'desc',
      name: 'Featured',
    },
    price__asc: {
      id: 'price',
      order: 'asc',
      name: 'Price: Low to High',
    },
    price__desc: {
      id: 'price',
      order: 'desc',
      name: 'Price: High to Low',
    },
    rating__desc: {
      id: 'rating',
      order: 'desc',
      name: 'Avg. Customer Review',
    },
    date__desc: {
      id: 'date',
      order: 'desc',
      name: 'Newest Arrivals',
    },
    sales__desc: {
      id: 'sales',
      order: 'desc',
      name: 'Best Sellers',
    },
  },
  allIds: [
    'featured__desc',
    'price__asc',
    'price__desc',
    'rating__desc',
    'date__desc',
    'sales__desc',
  ],
};

const FiltersProvider = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [url, setUrl] = useState(`${pathname}?${searchParams}`);
  const [filters, setFilters] = useState(normalizedData_OPTION1);
  const [selectedSortOption, setSelectedSortOption] = useState(
    sortOptions.byId[
      `${searchParams.get('sortby')}__${searchParams.get('order')}`
    ] || sortOptions.byId['featured__desc'],
  );

  const [selectedPriceMax, setSelectedPriceMax] = useState(
    `${searchParams.get('maxPrice')}` || null,
  );
  const [selectedPriceMin, setSelectedPriceMin] = useState(
    `${searchParams.get('minPrice')}` || null,
  );

  const [selectedBpmMin, setSelectedBpmMin] = useState(
    searchParams.get('minBpm') || null,
  );
  const [selectedBpmMax, setSelectedBpmMax] = useState(
    searchParams.get('maxBpm') || null,
  );

  const toggleOption = (categoryId, optionId) => {
    setFilters((currentFilters) =>
      produce(currentFilters, (draftState) => {
        const option = draftState.entities.options[optionId];
        if (option) {
          option.checked = !option.checked;
        }
      }),
    );
  };

  const pushNewPathnameAndSearchParams = (categoryId, optionId, isChecked) => {
    const locSearchParams: URLSearchParams = new URLSearchParams(
      searchParams as unknown as string,
    );

    if (isChecked) {
      locSearchParams.append(categoryId, optionId);
      locSearchParams.sort();
      //   addSelectedFilter(category, filterId);
    } else {
      locSearchParams.delete(categoryId, optionId);
      // removeSelectedFilter(category, filterId);
    }

    router.push(`${pathname}?${locSearchParams}`);
    return `${pathname}?${locSearchParams}`;
  };

  const handleFilterChecked = (categoryId, optionId, isChecked) => {
    toggleOption(categoryId, optionId);
    const newUrl = pushNewPathnameAndSearchParams(
      categoryId,
      optionId,
      isChecked,
    );
    setUrl(newUrl);
  };

  const handleSort = ({ sortby, order }: { sortby: string; order: string }) => {
    const locSearchParams: URLSearchParams = new URLSearchParams(
      searchParams as unknown as string,
    );

    locSearchParams.set('sortby', sortby);
    locSearchParams.set('order', order);
    locSearchParams.sort();

    router.push(`${pathname}?${locSearchParams}`);

    const newUrl = `${pathname}?${locSearchParams}`;
    setUrl(newUrl);
    // return `${pathname}?${locSearchParams}`;
  };

  const handleRange = ({
    id,
    min,
    max,
  }: {
    id: string;
    min: string;
    max: string;
  }) => {
    const locSearchParams: URLSearchParams = new URLSearchParams(
      searchParams as unknown as string,
    );

    // locSearchParams.append('price[]', min);
    // locSearchParams.append('price[]', max);

    // locSearchParams.set(`min${id[0].toUpperCase()}${id.substring(1)}`, min);
    // locSearchParams.set(`max${id[0].toUpperCase()}${id.substring(1)}`, max);

    locSearchParams.set(`min${id}`, min);
    locSearchParams.set(`max${id}`, max);

    locSearchParams.sort();

    router.push(`${pathname}?${locSearchParams}`);

    const newUrl = `${pathname}?${locSearchParams}`;
    setUrl(newUrl);
    // return `${pathname}?${locSearchParams}`;
  };

  const replaceAllFilters = (normalizedData) => {
    const updatedData2 = produce(normalizedData, (draftState) => {
      searchParams.forEach((optionId, categoryId) => {
        console.log('optionId: ', optionId, ', categoryId: ', categoryId);
        if (draftState.entities.options[optionId]) {
          draftState.entities.options[optionId].checked = true;
        } else {
          // console.log(optionId, categoryId);
          console.log('optionId', optionId);
        }
      });
    });

    // @ts-ignore
    setFilters(updatedData2);
  };

  const value = {
    filters,
    toggleOption,
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
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export default FiltersProvider;
