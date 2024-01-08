// apps/client/src/app/(browse)/(with-layout)/products/infi/page.tsx
import 'server-only';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ClientPage from './page.client';

import axios from 'axios';

type ProductProps = {
  params: { pageNumber: string };
};

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

async function Page({ params }: ProductProps) {
  const queryClient = new QueryClient();
  const serverPage = 1;
  const pageNumber = parseInt(params.pageNumber);

  await queryClient.prefetchQuery({
    queryKey: ['products', pageNumber],
    queryFn: () => getProducts(pageNumber),
  });

  return (
    <div>
      <h1>{pageNumber}</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientPage serverPage={serverPage} />
      </HydrationBoundary>
    </div>
  );
}
export default Page;
