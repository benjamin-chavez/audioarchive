// apps/client/src/app/products/[search]/page.tsx
'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { searchProducts } from './actions';
import { useEffect, useState } from 'react';
import Container from '@/components/container';
import ProductsGrid from '@/components/products-grid';

// const searchProducts = async (searchQuery: string) => {
//   const res = await fetch(`/api/search/products/${searchQuery}`);

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to create checkout session');
//   }

//   const { data } = await res.json();

//   return data;
// };

function ProductSearch() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');
  console.log('search: ', searchQuery);
  const [products, setProducts] = useState(null);

  // const params = useParams();
  // console.log('params: ', params);

  useEffect(() => {
    const searchProducts = async (searchQuery: string) => {
      const res = await fetch(`/api/search/products/${searchQuery}`);

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to ...');
      }

      const { data } = await res.json();
      setProducts(data);
    };

    searchProducts(searchQuery);
  }, [searchQuery]);

  if (products) {
    return (
      <Container>
        {/* <Suspense fallback={<p>loading products...</p>}> */}
        <ProductsGrid products={products} />
        {/* </Suspense> */}
      </Container>
    );
  }
}

export default ProductSearch;