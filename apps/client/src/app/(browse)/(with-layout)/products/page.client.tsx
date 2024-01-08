'use client';

import WishlistButton from '@/components/wishlist-button';
import { Pagination } from './paginated/pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Fragment, Suspense, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiltersContext } from '@/contexts/filter-context';
import { current } from 'immer';

async function getProducts(page: number, limit = 4) {
  const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
  // const res = await fetch(`/api/app-users/profiles`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default function Products(serverPage) {
  const searchParams = useSearchParams();
  const pageParam = parseInt(searchParams.get('page'), 10);
  const [currentPage, setCurrentPage] = useState(pageParam || 1);
  const [totalPages, setTotalPages] = useState(10);
  const [limit, setLimit] = useState(30);
  const { handlePagination } = useContext(FiltersContext);

  // const getProducts = (page = 1) =>
  //   // fetch(`/api/app-users/profiles`).then((res) => res.json());
  //   fetch('/api/products?page=' + page).then((res) => res.json());

  useEffect(() => {
    if (pageParam && pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }
  }, [pageParam]);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      // const { data } = useQuery({
      // queryKey: ['products'],
      queryKey: ['products', currentPage],
      queryFn: async () => await getProducts(currentPage, limit),
      placeholderData: keepPreviousData,
    });

  return (
    <div>
      {pageParam}
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <section
            aria-labelledby="products-heading"
            className="mx-auto max-w-2xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:max-w-7xl lg:px-8 "
          >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            {/* <div className="px-10 py-5 bg-orange-700/10"> */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {data.data?.map((product) => (
                <Suspense
                  fallback={<p>loading products...</p>}
                  key={product.id}
                >
                  <div>
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
            </div>
          </section>
        </>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePagination}
      />
    </div>
  );
}
