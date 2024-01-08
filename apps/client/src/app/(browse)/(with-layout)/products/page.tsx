// apps/client/src/app/(browse)/(with-layout)/products/infi/page.tsx
import 'server-only';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ClientPage from './(react-query)/products-paginate/page.client';
import Link from 'next/link';
import { Suspense } from 'react';
import WishlistButton from '@/components/wishlist-button';
import { Pagination } from './components/pagination';

// import axios from 'axios';
// export async function getProducts(pageNumber) {
//   const page = pageNumber;
//   const limit = 10;
//   return axios
//     .get(`http://localhost:5000/api/products?page=${page}&limit=${limit}`, {
//       // .get(`http://localhost:5000/api/app-users/profiles`, {
//       // params: { _sort: 'tite' },
//     })
//     .then((res) => res.data);
// }

export async function getProducts({
  searchParams, // limit,
  // page,
}: {
  searchParams: URLSearchParams;
  // page: number;
  // limit?: number;
}) {
  // const res = await fetch(
  //   `http://localhost:5000/api/products?page=${page}&limit=${limit}`,
  // );

  const res = await fetch(`http://localhost:5000/api/products?${searchParams}`);

  if (!res) {
    throw new Error('');
  }

  const { data } = await res.json();
  return data;
}

type ProductProps = {
  params: { pageNumber: string };
  searchParams?: {
    page?: string;
  };
  // searchParams: any;
};

export default async function Page({ params, searchParams }: ProductProps) {
  const currentPage = Number(searchParams?.page) || 1;

  // console.log('\n\n\n');
  // console.log('🚀 ~ searchParams:', JSON.stringify(searchParams, null, 2));
  // console.log('🚀 ~ currentPage:', currentPage);

  const searchParamsString: URLSearchParams = new URLSearchParams(
    searchParams as unknown as string,
  );
  // const products = await getProducts({ page: currentPage });
  const products = await getProducts({ searchParams: searchParamsString });
  const totalPages = 20;

  return (
    <div>
      <ProductSection products={products} searchParams={searchParams} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        // onPageChange={handlePagination}
      />
    </div>
  );
}

export function ProductSection({
  products,
  searchParams,
}: {
  products: any[];
  searchParams: any;
}) {
  return (
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
          {products?.map((product) => (
            <Suspense fallback={<p>loading products...</p>} key={product.id}>
              <div>
                <Link
                  // href="#"
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
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
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
  );
}
