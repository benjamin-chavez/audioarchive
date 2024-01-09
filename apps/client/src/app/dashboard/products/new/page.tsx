// apps/client/src/app/dashboard/products/new/page.tsx
import 'server-only';

import ProductForm from '@/components/product-form';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { revalidateListings } from '../page';

async function getPluginOptions() {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  const res = await fetch(`${BASE_URL}/search/populate-filters-and-appUsers`);

  if (!res.ok) {
    throw new Error('Failed to fetch initial Filter data');
  }

  const { data } = await res.json();

  return data;
}

export default withPageAuthRequired(async function NewListingPage() {
  return (
    <div>
      <h1>Create New Listing Page</h1>
      <Link href={'/dashboard/products/'}>Back to Listings</Link>
      <ProductForm revalidateListings={revalidateListings} />
    </div>
  );
});
