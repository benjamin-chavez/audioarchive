// apps/client/src/contexts/filter-context.tsx

import { normalizedData_OPTION1 } from '@/lib/normalize';
import { createContext, useMemo, useState } from 'react';
import { produce } from 'immer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useImmer } from 'use-immer';

type FiltersState = {
  filters: any;
  url: string;
  setUrl: any;
  setFilters: any;
  toggleOption: any;
  handleFilterChecked: any;
  replaceAllFilters: any;
};

export const FiltersContext = createContext({} as FiltersState);

const FiltersProvider = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [url, setUrl] = useState(`${pathname}?${searchParams}`);
  const [filters, setFilters] = useState(normalizedData_OPTION1);

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

    setFilters(updatedData2);
  };

  const value = {
    filters,
    url,
    setUrl,
    setFilters,
    toggleOption,
    handleFilterChecked,
    replaceAllFilters,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export default FiltersProvider;
