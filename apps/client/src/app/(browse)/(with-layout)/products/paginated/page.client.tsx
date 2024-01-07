// // // apps/client/src/app/(browse)/(with-layout)/products/page.client.tsx

// // 'use client';

// // import { useIntersection } from '@mantine/hooks';
// // import { useInfiniteQuery } from '@tanstack/react-query';
// // import { useEffect } from 'react';

// // const posts = [
// //   { id: 1, title: 'post 1' },
// //   { id: 2, title: 'post 2' },
// //   { id: 3, title: 'post 3' },
// //   { id: 4, title: 'post 4' },
// //   { id: 5, title: 'post 5' },
// //   { id: 6, title: 'post 6' },
// //   { id: 7, title: 'post 7' },
// //   { id: 8, title: 'post 8' },
// //   { id: 9, title: 'post 9' },
// //   { id: 10, title: 'post 10' },
// //   { id: 11, title: 'post 11' },
// //   { id: 12, title: 'post 12' },
// //   { id: 13, title: 'post 13' },
// //   { id: 14, title: 'post 14' },
// //   { id: 15, title: 'post 15' },
// //   { id: 16, title: 'post 16' },
// //   { id: 17, title: 'post 17' },
// //   { id: 18, title: 'post 18' },
// //   { id: 19, title: 'post 19' },
// //   { id: 20, title: 'post 20' },
// // ];

// // const product = [];
// // // const getProducts = async (page: number) => {
// // //   await new Promise((resolve) => setTimeout(resolve, 1000));
// // //   return posts.slice((page - 1) * 2, page * 2);
// // // };

// // async function getProducts(page: number) {
// //   const res = await fetch(`/api/products`);

// //   if (!res.ok) {
// //     // This will activate the closest `error.js` Error Boundary
// //     throw new Error('Failed to fetch products');
// //   }

// //   return res.json();
// // }

// // export default function ClientPage() {
// //   const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
// //     queryKey: ['query'],
// //     queryFn: async ({ pageParam = 1 }) => {
// //       const response = await getProducts(pageParam);
// //       return response;
// //     },
// //     getNextPageParam: (_, pages) => {
// //       return pages.length + 1;
// //     },
// //     // initialData: () => ({
// //     //   pages: [products.slice(0, 2)],
// //     //   pageParams: [undefined],
// //     // }),
// //     initialPageParam: undefined,
// //   });

// //   const { ref, entry } = useIntersection({
// //     threshold: 1,
// //   });

// //   useEffect(() => {
// //     if (entry?.isIntersecting) fetchNextPage();
// //   }, [entry, fetchNextPage]);

// //   // const products = data?.pages.flatMap((page) => page);
// //   const products = data;
// //   console.log('products', JSON.stringify(product, null, 2));

// //   return (
// //     <div>
// //       <h3>products:</h3>

// //       {products?.map((product, i) => (
// //         <div
// //           key={product.id}
// //           ref={i === products?.length - 1 ? ref : null}
// //           className={
// //             i === products?.length - 1
// //               ? 'bg-green-500/40 mt-2 w-1/2 h-80'
// //               : 'bg-pink-500/40 mt-2 w-1/2 h-80'
// //           }
// //         >
// //           {product.title}
// //         </div>
// //       ))}
// //       {/*  */}
// //       <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
// //         {isFetchingNextPage
// //           ? 'Loading more...'
// //           : (data?.pages.length ?? 0) < 3
// //             ? 'Load More'
// //             : 'Nothing more to load'}
// //       </button>
// //     </div>
// //   );
// // }

'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// async function getProducts(page = 1, limit = 1) {
//   const res = await fetch(`/api/products?page=${page}&limit=${limit}`);

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch products');
//   }

//   return res.json();
// }

export default function Products() {
  const [page, setPage] = useState(3);
  // const [limit, setLimit] = useState(1);

  const getProducts = (page = 3) =>
    fetch('/api/products?page=' + page).then((res) => res.json());

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      // const { data } = useQuery({
      // queryKey: ['products'],
      queryKey: ['products', page],
      queryFn: () => getProducts(page),
      placeholderData: keepPreviousData,
    });

  return (
    <div>
      <h2>Client Component</h2>

      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="px-10 py-5 bg-orange-700/10">
          {data.data.map((product) => (
            <p key={product.id}>{product.name}</p>
          ))}
          {/* <div>{JSON.stringify(data, null, 2)}</div> */}
        </div>
      )}

      <div className="mt-10 space-x-4 flex">
        <button
          className="px-4 py-2 rounded bg-pink-500 disabled:bg-pink-200 text-gray-300"
          // onClick={() => setPage(page - 1)}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>

        <div className="px-4 py-2">{page}</div>

        <button
          className="px-4 py-2 rounded bg-pink-500 disabled:bg-pink-200 text-gray-300"
          // onClick={() => setPage(page + 1)}
          onClick={() => {
            if (!isPlaceholderData && data.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          // disabled={isPlaceholderData || !data?.hasMore}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
