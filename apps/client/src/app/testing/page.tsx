// // apps/client/src/app/testing/page.tsx

// import 'server-only';

// async function getMyCart() {
//   try {
//     const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
//     // const res = await fetch(`${BASE_URL}/app-users/profiles`);

//     const res = await fetch(`${BASE_URL}/app-users/me/cart`);

//     if (!res.ok) {
//       throw new Error('Failed to fetch Shopping Cart');
//     }
//     const response = await res.json();

//     // console.log('res: ', response);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to get cart:', error);
//   }
// }

// async function Testing() {
//   const data = await getMyCart();
//   console.log('data: ', data);

//   return (
//     <div>
//       <h1>Testing</h1>
//     </div>
//   );
// }
// export default Testing;

// apps/client/src/app/testing/page.tsx

'use client';

import { useShoppingCart } from '@/services/client/cart.api-client';

function Testing() {
  const { data, isLoading, isError, error } = useShoppingCart();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  console.log('data: ', data);

  return (
    <div>
      <h1>Testing</h1>
    </div>
  );
}
export default Testing;
