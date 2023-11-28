// apps/client/src/data/app-user.ts

// export async function getAppUserWithProducts(integerId: number) {
//   const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

//   const res = await fetch(`${BASE_URL}/app-users/u/${integerId}/products`);

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch products');
//   }

//   return res.json();
// }

export async function getAppUserWProducts(username: string) {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  const res = await fetch(`${BASE_URL}/app-users/u/${username}/products`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch products');
  }

  return res.json();
}
