// frontend/app/project-files/[slug]/page.tsx
import 'server-only';

import { getProductDetails, getProductReviews } from '@/lib/data/product';
import { ProductWithAppUser } from '@shared/src';
// import { revalidateCart } from '../../cart/page';
import PageClient from './page.client-side';
import { revalidateCart } from '@/app/(app-users)/cart/page';
import Container from '@/components/container';

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
  console.log(product);

  const productReviewData = await getProductReviews(product.id);

  return (
    <Container>
      <PageClient
        product={product}
        revalidateCart={revalidateCart}
        productReviewData={productReviewData.data}
      />
    </Container>
  );
}
