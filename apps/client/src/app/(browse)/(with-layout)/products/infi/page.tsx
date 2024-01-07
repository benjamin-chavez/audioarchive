// apps/client/src/app/(browse)/(with-layout)/products/infi/page.tsx
import 'server-only';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ClientPage from './page-with-cursor.client';

import axios from 'axios';

export function getProducts(pageParam: number) {
  return axios
    .get('http://localhost:5000/api/products?cursor=' + pageParam, {
      // params: { _sort: 'tite' },
    })
    .then((res) => res.data);
}

async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => getProducts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    pages: 3,
  });

  const fetchedProducts = await getProducts(0);
  console.log(fetchedProducts);

  return (
    <div>
      <h1>Server Component</h1>

      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <ClientPage fetchedProducts={fetchedProducts} />
      {/* </HydrationBoundary> */}
    </div>
  );
}
export default Page;
