// apps/client/src/data/products.ts
import 'server-only';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  // const res = await axios.get(`${BASE_URL}/products`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export async function getProductDetails(integerId: number) {
  const res = await fetch(`${BASE_URL}/products/${integerId}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

// export const dynamic = 'force-dynamic';