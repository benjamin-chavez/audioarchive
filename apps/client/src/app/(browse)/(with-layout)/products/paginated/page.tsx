// apps/client/src/app/(browse)/(with-layout)/products/infi/page.tsx
import 'server-only';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ClientPage from './page.client';

import axios from 'axios';

export function getProducts() {
  const page = 1;
  const limit = 10;
  return axios
    .get(`http://localhost:5000/api/products?page=${page}&limit=${limit}`, {
      // .get(`http://localhost:5000/api/app-users/profiles`, {
      // params: { _sort: 'tite' },
    })
    .then((res) => res.data);
}

async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', 1],
    queryFn: getProducts,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientPage />
      </HydrationBoundary>
    </div>
  );
}
export default Page;
