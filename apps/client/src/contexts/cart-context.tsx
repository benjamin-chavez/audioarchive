// apps/client/src/contexts/cart-context.tsx
'use client';

import { CartItem, ProductWithAppUser } from '@shared/src';
import { ReactNode, createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const MAX_PURCHASE_QUANTITY = 5;

type CartContext = {
  increaseCartQuantity: (product: any) => void;
  setCartQuantity: (
    product: ProductWithAppUser | any,
    newQuantity: number,
  ) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[] | any[];
};

const CartContext = createContext<CartContext | null>(null);

export function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  // const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[] | any[]>(
    'cart-items',
    [],
  );

  // const handleMaxQuantityError = () => {
  //   setError('Can only purchase 5 copies of a given item at a time');

  //   // Optionally, you can clear the error after some time
  //   setTimeout(() => setError(null), 3000); // Clears error after 3 seconds
  // };

  const cartQuantity = cartItems.reduce(
    // @ts-ignore
    (quantity, item) => item.quantity + quantity,
    // @ts-ignore
    0,
  );

  async function increaseCartQuantity(product: any | ProductWithAppUser) {
    const { id: productId } = product;

    const originalCartItems = [...cartItems];

    setCartItems((curItems) => {
      if (curItems.find((item) => item.productId === productId) == null) {
        // TODO: FIX CART ID
        return [...curItems, { cartId: 1, productId, quantity: 1, ...product }];
      } else {
        return curItems.map((item) => {
          if (item.productId === productId) {
            // TODO: handle this error more appropriatly
            if (item.quantity === MAX_PURCHASE_QUANTITY) {
              throw Error(
                'Can only purchase 5 copies of a given item at a time',
              );
            }
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });

    const res = await fetch(`/api/app-users/me/cart/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) {
      setCartItems(originalCartItems);
      console.error('Server update failed: ', res.json());
      // throw new Error('Problem adding item to cart');
    }
  }

  function setCartQuantity(
    product: any | ProductWithAppUser,
    newQuantity: number,
  ) {
    if (newQuantity >= MAX_PURCHASE_QUANTITY) {
      throw Error('Can only purchase 5 copies of a given item at a time');
    }

    const { id: productId } = product;

    setCartItems((curItems) => {
      const itemExists = curItems.find((item) => item.productId === productId);

      if (!itemExists) {
        return [...curItems, { ...product, productId, quantity: newQuantity }];
      } else {
        return curItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item,
        );
      }
    });
  }

  async function removeFromCart(cartItemId: number) {
    const originalCartItems = [...cartItems];

    setCartItems((curItems) => {
      return curItems.filter((item) => item.id !== cartItemId);
    });

    const res = await fetch(`api/app-users/me/cart/items/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      setCartItems(originalCartItems);
      console.error('Failed to removed item from cart: ', res.json());
      // throw new Error('Failed to removed item from cart');
    }

    // return res.json();
  }

  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        increaseCartQuantity,
        setCartQuantity,
        removeFromCart,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// function setCartQuantity(
//   product: ProductWithAppUser | any,
//   newQuantity: number,
// ) {
//   const { id: productId } = product;

//   setCartItems((curItems) => {
//     const existingItem = curItems.find(
//       (item) => item.productId === productId,
//     );

//     if (!existingItem) {
//       return [...curItems, { cartId: 1, productId, quantity: newQuantity }];
//     }

//     if (newQuantity > MAX_PURCHASE_QUANTITY) {
//       handleMaxQuantityError();
//       return curItems;
//     }

//     return curItems.map((item) => {
//       item.productId === productId
//         ? { ...item, quantity: newQuantity }
//         : item;
//     });
//   });
// }

// function increaseCartQuantity(product: any | ProductWithAppUser) {
//   const currentQuantity =
//     cartItems.find((item) => item.productId === product.id)?.quantity || 0;

//   setCartQuantity(product, currentQuantity + 1);
// }
