//  apps/client/src/app/search/products/[searchQuery]/page
'use client';
import { useParams, useSearchParams } from 'next/navigation';

function Page() {
  // const searchParams = useSearchParams();
  // console.log('searchParams: ', searchParams);

  const params = useParams();
  console.log('params: ', params);

  return <div>Page</div>;
}
export default Page;
