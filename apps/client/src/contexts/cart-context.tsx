// apps/client/src/contexts/cart-context.tsx
'use client';

import { CartItem, Product, ProductWithAppUser } from '@shared/src';
import { ReactNode, createContext, useContext, useState } from 'react';

type CartContext = {
  increaseCartQuantity: (productId: number) => void;
  setCartQuantity: (product: any, quantity: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[] | any[];
};

const CartContext = createContext<CartContext | null>(null);
// const CartContext = createContext<CartContext>({} as CartContext);

export function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[] | any[]>([]);

  function increaseCartQuantity(product: any | ProductWithAppUser) {
    const { id: productId } = product;

    setCartItems((curItems) => {
      if (curItems.find((item) => item.productId === productId) == null) {
        // TODO: FIX CART ID
        return [...curItems, { cartId: 1, productId, quantity: 1, ...product }];
      } else {
        return curItems.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });

    console.log(cartItems);
  }

  function setCartQuantity(
    product: any | ProductWithAppUser,
    newQuantity: number,
  ) {
    console.log('produ: ', product);
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

    console.log('setCartQuantity: ', cartItems);
  }

  function removeFromCart(id: number) {
    setCartItems((curItems) => {
      return curItems.filter((item) => item.id !== id);
    });

    console.log('removeFromCart: ', cartItems);
  }

  return (
    <CartContext.Provider
      value={{
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
