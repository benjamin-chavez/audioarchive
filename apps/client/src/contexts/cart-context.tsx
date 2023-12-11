// apps/client/src/contexts/cart-context.tsx
'use client';

import { CartItem, Product } from '@shared/src';
import { ReactNode, createContext, useContext, useState } from 'react';

type CartContext = {
  increaseCartQuantity: (productId: number) => void;
  cartItems: CartItem[];
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function increaseCartQuantity(product: Product) {
    const { id: productId } = product;

    setCartItems((curItems) => {
      if (curItems.find((item) => item.productId === productId) == null) {
        // TODO: FIX CART ID
        return [...curItems, { cartId: 1, productId, quantity: 1 }];
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

  return (
    <CartContext.Provider
      value={{
        increaseCartQuantity,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
