'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ShoppingCart } from './components/shopping-cart';
import { StoreItem } from './components/store-item';

import storeItems from './data/items.json';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

async function getMyCart() {
  try {
    const res = await fetch(`/api/app-users/me/cart`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Shopping Cart');
    }

    const { data } = await res.json();
    console.log('res', data);
    return data;
  } catch (error) {
    // TODO: FINISH HANDLING ERRORS HERE
    // PROBABLY SHOULD REDIRECT TO LOGIN?
    return {};
  }
}

function Page(children: ReactNode) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const cartData = await getMyCart();
        setProducts(cartData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  if (products) {
    console.log(products);

    return (
      <div>
        <h1>cart-context-test</h1>
        {/* <StoreItem /> */}
        <ShoppingCart />

        <div className="flex flex-row gap-8">
          {storeItems.map((item) => (
            <div className="w-56  " key={item.id}>
              <StoreItem {...item} />
            </div>
          ))}
        </div>
        {/* <ProductsGrid products={products} /> */}
      </div>
    );
  }
}
export default Page;
