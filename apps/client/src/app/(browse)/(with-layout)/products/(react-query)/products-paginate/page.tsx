// apps/client/src/app/(browse)/(with-layout)/products/infi/page.tsx
import 'server-only';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ClientPage from './page.client';

import axios from 'axios';
export async function getProducts(pageNumber) {
  const page = pageNumber;
  const limit = 10;
  return axios
    .get(`http://localhost:5000/api/products?page=${page}&limit=${limit}`, {
      // .get(`http://localhost:5000/api/app-users/profiles`, {
      // params: { _sort: 'tite' },
    })
    .then((res) => res.data);
}

export default async function Page() {
  const currentPage = 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', currentPage],
    queryFn: () => getProducts(currentPage),
  });

  return (
    <div>
      <h1 className="bg-red-500">{currentPage}</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientPage />
      </HydrationBoundary>
    </div>
  );
}
