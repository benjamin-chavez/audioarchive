// frontend/app/project-files/[slug]/page.tsx
import 'server-only';

import { getProductDetails } from '@/services/server/products.server-api';
import { ProductWithAppUser } from '@shared/src';
// import { revalidateCart } from '../../cart/page';
import ProductsPageClient from './page.client-side';

type ProductProps = {
  params: { id: string };
};

export default async function ProductDetail({ params }: ProductProps) {
  const integerId = parseInt(params.id);

  // TODO: Should the id be passed as a query instead to utilize the cache??
  // const products = await getProductDetails(integerId);
  // const product = products[0];

  const res = await getProductDetails(integerId);
  const product: ProductWithAppUser = res.data;

  return (
    <>
      <ProductsPageClient
        product={product}
        // revalidateCart={revalidateCart}
      />
    </>
  );
}
