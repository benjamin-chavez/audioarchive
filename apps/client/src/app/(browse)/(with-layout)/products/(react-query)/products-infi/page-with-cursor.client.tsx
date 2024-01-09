'use client';

import {
  keepPreviousData,
  useQuery,
  useInfiniteQuery,
} from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import WishlistButton from '@/components/wishlist-button';

const getProducts = async (pageParam: number) => {
  // const res = await fetch('/api/app-users/profiles');
  const res = await fetch('/api/products?cursor=15');

  const products = await res.json();
  // console.log('products', products);
  // return res.json();
  return products;
};

export default function Products({
  fetchedProducts,
}: {
  fetchedProducts: any;
}) {
  const { ref, inView, entry } = useInView({ threshold: 1 });
  const searchParams = useSearchParams();

  console.log(JSON.stringify(fetchedProducts, null, 2));
  const pathname = usePathname();
  const router = useRouter();
  const {
    isPending,
    isError,
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => getProducts(pageParam),
    // initialData: () => ({ fetchedProducts }),
    initialData: () => ({
      pages: [fetchedProducts],
      //  pages: [posts.slice(0, 2)],
      pageParams: [undefined],
    }),
    initialPageParam: undefined,
    // ...options,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      const nextCursor = lastPage?.nextCursor;

      return nextCursor;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetching]);

  // useEffect(() => {
  //   if (currentCursor !== null) {
  //     const updatedParams = new URLSearchParams(searchParams);

  //     // const scrollPosition = window.scrollY;
  //     // updatedParams.set('scroll', `${scrollPosition}`);

  //     updatedParams.set('cursor', currentCursor.toString());

  //     const newUrl = `http://localhost:3000${pathname}?${updatedParams}`;
  //     window.history.pushState({}, '', newUrl);
  //   }
  // }, [currentCursor]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : ( */}
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

        <div
          // -mt-40
          className="space-x-4 flex"
        >
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
      {/* )} */}
    </div>
  );
}