// apps/client/src/app/dashboard/products/new/page.tsx
import 'server-only';

import ProductForm from '@/components/product-form';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { revalidateListings } from '../page';
import { normalizeData } from '@/lib/custom-normalize';

async function getPluginOptions() {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  const res = await fetch(`${BASE_URL}/plugins`);

  if (!res.ok) {
    throw new Error('Failed to fetch initial Filter data');
  }

  const { data } = await res.json();
  console.log('🚀 ~ data:', data);

  return data;
}

export default withPageAuthRequired(async function NewListingPage() {
  const pluginOptions = await getPluginOptions();
  const normalizedPluginOptions = normalizeData(pluginOptions, ['plugins']);

  console.log(JSON.stringify(normalizedPluginOptions, null, 2));
  return (
    <div>
      <h1>Create New Listing Page</h1>
      <Link href={'/dashboard/products/'}>Back to Listings</Link>
      <ProductForm
        revalidateListings={revalidateListings}
        pluginOptions={normalizedPluginOptions}
      />
    </div>
  );
});
