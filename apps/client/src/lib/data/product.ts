// apps/client/src/data/products.ts
import 'server-only';

export async function getProductDetails(integerId: number) {
  // const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
  // const BASE_URL = `http://localhost:5000/api`;
  const BASE_URL = `http://api.audioarchive.benchavez.xyz/api`;

  const res = await fetch(`${BASE_URL}/products/${integerId}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export const dynamic = 'force-dynamic';