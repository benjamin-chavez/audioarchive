// frontend/src/app/project-files/page.tsx
import 'server-only';

import Container from '@/components/container';
import { Suspense } from 'react';
import TestSearch from '@/components/test-search/text-search';
import Inner from '@/components/test-search/inner';
import ProductsGrid from '@/components/products-grid copy';

async function getProducts() {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function ProductsPage() {
  const res = await getProducts();
  const products = res.data;

  return (
    <div
    // className="bg-red-500"
    >
      <Container>
        <div className="flex">
          <Inner />
          {/* <Suspense fallback={<p>loading products...</p>}> */}

          <TestSearch>
            <ProductsGrid products={products} />
          </TestSearch>

          {/* </Suspense> */}
        </div>
      </Container>
    </div>
  );
}

export const dynamic = 'force-dynamic';
