// frontend/src/app/project-files/page.tsx
import 'server-only';

import ProductsGrid from '../../components/products-grid';
import Container from '@/components/container';
import { getProducts } from '@/services/server/products.server-api';

export default async function ProductsPage() {
  const res = await getProducts();
  const products = res.data;

  return (
    <Container>
      <ProductsGrid products={products} />
    </Container>
  );
}

export const dynamic = 'force-dynamic';
