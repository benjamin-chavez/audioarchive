// apps/client/src/app/dashboard/products/edit/[product-id]/page.tsx

import 'server-only';

import ProductForm from '@/components/product-form';
import { getMyProductById } from '@/lib/data/me';
import Link from 'next/link';
import { revalidateListings } from '../../page';

export default async function EditListingPage(context: any) {
  const productId = parseInt(context.params['product-id']);

  const res = await getMyProductById(productId);
  const { product } = res.data;

  return (
    <div>
      <h1>Edit Listing</h1>
      <Link href={'/dashboard/products/'}>Back to Listings</Link>

      <ProductForm product={product} revalidateListings={revalidateListings} />
    </div>
  );
}
