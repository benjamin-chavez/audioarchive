// apps/client/src/app/dashboard/products/new/page.tsx
import 'server-only';

import ProductForm from '@/components/product-form';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { revalidateListings } from '../page';

export default withPageAuthRequired(async function NewListingPage() {
  return (
    <div>
      <h1>Create New Listing Page</h1>
      <Link href={'/dashboard/products/'}>Back to Listings</Link>
      <ProductForm revalidateListings={revalidateListings} />
    </div>
  );
});
