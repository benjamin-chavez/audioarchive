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
  setInitialFilters: any;
};

export const FiltersContext = createContext({} as FiltersState);

const FiltersProvider = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [filters, setFilters] = useState(normalizedData_OPTION1);
  const [url, setUrl] = useState(`${pathname}?${searchParams}`);
  const [filters, setFilters] = useState(normalizedData_OPTION1);

  const setInitialFilters = (normalizedData) => {
    // setFilters(normalizedData);
  };

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

  // const toggleOption = useCallback((categoryId, optionId) => {
  //   setFilters((draft) => {
  //     const option = draft.entities.options[optionId];
  //     option.checked = !option.checked;
  //   });
  // }, []);

  const pushNewPathnameAndSearchParams = (categoryId, optionId, isChecked) => {
    const locSearchParams: URLSearchParams = new URLSearchParams(
      searchParams as unknown as string,
    );

    // for (const [key, val] of searchParams.entries()) {
    //   // console.log('key: ', key, ', val: ', val);
    //   console.log(`${key}, ${value}`);
    // }

    // searchParams.forEach((value, key) => {
    //   console.log(value, key);
    // });

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
    // const updatedData = Object.entries(selectedFilters.entities.categories).map(
    //   ([categoryId, category]) => {
    //     category.options.forEach((optionId) => {
    //       normalizedData.entities.options[optionId].checked = 'true';
    //     });
    //   },
    // );

    // setFilters((currentState) =>
    //   produce(currentState, (draftState) => {
    //     return normalizedData;
    //   }),
    // );
    // console.log(JSON.stringify(filters, null, 2));
    // console.log(JSON.stringify(normalizedData, null, 2));

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
    // const updatedData = produce(normalizedData, (draftState) => {
    //   Object.entries(selectedFilters.entities.categories).forEach(
    //     ([categoryId, category]) => {
    //       category.options.forEach((optionId) => {
    //         if (draftState.entities.options[optionId]) {
    //           draftState.entities.options[optionId].checked = true;
    //         }
    //       });
    //     },
    //   );
    // });

    // console.log(JSON.stringify(updatedData2, null, 2));

    // return updatedData2;
    setFilters(updatedData2);
  };

  // const value = {
  //   filters,
  //   url,
  //   setUrl,
  //   setFilters,
  //   toggleOption,
  //   handleFilterChecked,
  //   replaceAllFilters,
  // };

  const value = {
    filters,
    url,
    setUrl,
    setFilters,
    toggleOption,
    handleFilterChecked,
    replaceAllFilters,
    setInitialFilters,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export default FiltersProvider;
