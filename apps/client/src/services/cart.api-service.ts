// apps/client/src/services/cart.api-service.ts

// export const updateDatabaseCart = async ({
//   cartId,
//   cartItems,
// }: {
//   cartId: number;
//   cartItems: any;
// }) => {
//   const res = await fetch(`/api/app-users/me/cart/items`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ cartId, cartItems }),
//   });

//   if (!res.ok) {
//     throw new Error('Failed to update cart');
//   }

//   return res;
// };
