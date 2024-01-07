'use client';

import {
  keepPreviousData,
  useQuery,
  useInfiniteQuery,
} from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import WishlistButton from '@/components/wishlist-button';

// const getProducts = async (pageParam: number) => {
//   const res = await fetch('/api/products?page=' + pageParam);

//   return res.json();
// };

export default function Products() {
  // const [page, setPage] = useState(3);
  // const [limit, setLimit] = useState(1);
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const searchParams = useSearchParams();

  const getProducts = (pageParam: number) =>
    fetch('/api/products?page=' + pageParam).then((res) => res.json());

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    status,
    isPlaceholderData,
  } = useInfiniteQuery({
    queryKey: ['products'],
    // queryFn: getProducts,
    queryFn: ({ pageParam }) => getProducts(pageParam),
    initialPageParam: 0,
    // ...options,
    // placeholderData: keepPreviousData,
    // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    // getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    //   lastPage.nextCursor,

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    const scrollToInfiniti = async () => {
      if (inView) {
        await fetchNextPage();
      }
    };

    scrollToInfiniti();
  }, [
    fetchNextPage,
    inView,
    // isFetching
  ]);

  if (status === 'pending' || isPending) {
    return <div>Loading...</div>;
  }

  if (status === 'error' || isError) {
    <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="px-10 py-5 bg-orange-700/10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.data?.map((product) => (
                <Suspense fallback={<p>loading products...</p>}>
                  <div key={product.id}>
                    <Link
                      href={`/products/${product.id}?ref=${encodeURIComponent(
                        `/products?${searchParams}`,
                      )}`}
                      className="group"
                    >
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img
                          src={product.imgS3Url}
                          alt={product.imgS3Url}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {product.name}
                      </p>
                    </Link>
                    <span>{product.id}</span>
                    <WishlistButton productId={product.id} />
                  </div>
                </Suspense>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      {/* <List onEndReached={() => !isFetching && fetchNextPage()} /> */}

      <div className="-mt-40 space-x-4 flex">
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="h-10 bg-blue-500"
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
}
