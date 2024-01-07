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
  return axios
    .get('http://localhost:5000/api/products', {
      // params: { _sort: 'tite' },
    })
    .then((res) => res.data);
}

async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <div>
      <h1>Server Component</h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientPage />
      </HydrationBoundary>
    </div>
  );
}
export default Page;
