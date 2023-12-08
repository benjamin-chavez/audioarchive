// apps/client/src/contexts/cartContext.tsx

import { CartItem } from '@shared/src';
import { ReactNode, createContext, useContext, useState } from 'react';

type CartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  setItemQuantity: (id: number, quantity: number) => void;
  cartQuantity: number;
  cartItems: CartItem2[];
};

type CartItem2 = {
  id: number;
  quantity: number;
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: ReactNode }) {
  // const [cartItems, setCartItems] = useState<Partial<CartItem[]>>({});
  const [cartItems, setCartItems] = useState<CartItem2[]>([]);
  const [cartQuantity, setCartQuantity] = useState(1);

  function increaseCartQuantity(id: number) {
    setCartItems((curItems) => {
      if (curItems.find((item) => item.id === id) == null) {
        return [...curItems, { id, quantity: 1 }];
      } else {
        return curItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });

    console.log(cartItems);
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((curItems) => {
      if (curItems.find((item) => item.id === id)?.quantity === 1) {
        return curItems.filter((item) => item.id !== id);
      } else {
        return curItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function setItemQuantity(id: number, quantity: number) {
    setCartItems((curItems) => {
      if (curItems.find((item) => item.id === id) == null) {
        return [...curItems, { id, quantity: quantity }];
      } else {
        return curItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: quantity };
          } else {
            return item;
          }
        });
      }
    });

    console.log(cartItems);
  }

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function removeFromCart(id: number) {
    setCartItems((curItems) => {
      return curItems.filter((item) => item.id !== id);
    });
  }

  function getCartItems() {
    console.log(cartItems);
    return cartItems;
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        setItemQuantity,
        // getCartItems,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
