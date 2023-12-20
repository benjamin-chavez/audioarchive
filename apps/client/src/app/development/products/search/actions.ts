// apps/client/src/app/products/search/actions.ts

'use server';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const searchProducts = async (searchQuery: string) => {
  const res = await fetch(`${BASE_URL}/search/products/${searchQuery}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to create checkout session');
  }

  const { data } = await res.json();

  return data;
};
