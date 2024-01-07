// apps/client/src/hooks/useInfiniteScroll.ts

// REFERENCE: https://github.com/reduxjs/redux-toolkit/discussions/1163#discussioncomment-1667214

import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

const calculateMaxPages = (total: number, size: number) => {
  return Math.ceil(total / size);
};

export const isValidNotEmptyArray = (array: any[]): boolean => {
  return !!(array && array?.length && array?.length > 0);
};

export interface IListQueryResponse {
  items: any[];
  total: number;
  page: number;
  size: number;
}

const useInfiniteScroll = (
  useGetDataListQuery: UseQuery<any>,
  { size = 10, ...queryParameters },
) => {
  const [localPage, setLocalPage] = useState(1);
  const [combinedData, setCombinedData] = useState([]);
  const queryResponse = useGetDataListQuery({
    page: localPage,
    size,
    ...queryParameters,
  });
  const {
    items: fetchData = [],
    page: remotePage = 1,
    total: remoteTotal = 0,
    size: remoteSize = 10,
  } = (queryResponse?.data as IListQueryResponse) || {};

  useEffect(() => {
    if (isValidNotEmptyArray(fetchData)) {
      if (localPage === 1) setCombinedData(fetchData);
      else if (localPage === remotePage) {
        setCombinedData((previousData) => [...previousData, ...fetchData]);
      }
    }
  }, [fetchData]);

  const maxPages = useMemo<number>(() => {
    return calculateMaxPages(remoteTotal, remoteSize);
  }, [remoteTotal, remoteSize]);

  const refresh = useCallback(() => {
    setLocalPage(1);
  }, []);

  const readMore = () => {
    if (localPage < maxPages && localPage === remotePage) {
      setLocalPage((page) => page + 1);
    }
  };

  return {
    combinedData,
    localPage,
    readMore,
    refresh,
    isLoading: queryResponse?.isLoading,
    isFetching: queryResponse?.isFetching,
  };
};

export default useInfiniteScroll;

// EXAMPLE USE:

// const { combinedData, readMore, refresh } = useInfiniteScroll(
//   useGetProvidersListQuery,
//   {
//     latitude: -0.78,
//     longitude: -78.4,
//     categoryId: 9,
//   },
// );
