// // temp.ts

//   async function setCartQuantity(
//     product: any | ProductWithAppUser,
//     newQuantity: number
//   ) {
//     if (newQuantity > MAX_PURCHASE_QUANTITY) {
//       throw Error('Can only purchase 5 copies of a given item at a time');
//     }

//     const originalCartItems = [...cartItems];

//     const { id: productId } = product;

//     setCartItems((curItems) => {
//       const itemExists = curItems.find((item) => item.productId === productId);

//       if (!itemExists) {
//         return [...curItems, { ...product, productId, quantity: newQuantity }];
//       }

//       return curItems.map((item) =>
//         item.productId === productId ? { ...item, quantity: newQuantity } : item
//       );
//     });

//     if (!isAuthenticated) {
//       return;
//     }

//     try {
//       const res = await axios.put(`/api/app-users/me/cart/items`, {
//         productId,
//         quantity: newQuantity,
//       });

//       console.log('res: ', res);
//       if (res.status !== 200) {
//         setCartItems(originalCartItems);
//         console.error('Server update failed: ', res.data);
//         // throw new Error('Problem adding item to cart');
//       }
//     } catch (error) {
//       setCartItems(originalCartItems);
//       console.error('Server update failed: ', error);
//     }
//   }

//   async function removeFromCart(cartItemId: number) {
//     const originalCartItems = [...cartItems];

//     setCartItems((curItems) => {
//       return curItems.filter((item) => item.id !== cartItemId);
//     });

//     if (!isAuthenticated) {
//       return;
//     }

//     const res = await fetch(`api/app-users/me/cart/items/${cartItemId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!res.ok) {
//       setCartItems(originalCartItems);
//       console.error('Failed to removed item from cart: ', res.json());
//       // throw new Error('Failed to removed item from cart');
//     }

//     // return res.json();
//   }
