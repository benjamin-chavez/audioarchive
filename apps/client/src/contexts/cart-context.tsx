// apps/client/src/contexts/cart-context.tsx
'use client';

import { authAdapter } from '@/lib/auth';
import { getMyCart } from '@/services/client/cart.api-client';

import { CartItem, ProductWithAppUser } from '@shared/src';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';

const MAX_PURCHASE_QUANTITY = 5;

type CartContext = {
  increaseCartQuantity: (product: any) => void;
  // setCartQuantity: (
  //   product: ProductWithAppUser | any,
  //   newQuantity: number,
  // ) => void;
  // removeFromCart: (id: number) => void;
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
  const { user, isAuthenticated } = authAdapter.useAppUser();
  // const [error, setError] = useState<string | null>(null);
  const [localCartItems, setLocalCartItems] = useLocalStorage<
    CartItem[] | any[]
  >('cart-items', []);
  const [cartItems, setCartItems] = useState(
    isAuthenticated ? [] : localCartItems,
  );

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => getMyCart(),
  });

  // if (cartQuery.isLoading) return <h1>Loading...</h1>;
  // if (cartQuery.isError) {
  //   return <pre>{JSON.stringify(cartQuery.error)}</pre>;
  // }

  // const fetchCartFromServer = () => {
  //   return;
  // };

  // useEffect(() => {
  //   const updateAppUserCartWithLocalStorage = async () => {
  //     if (!isAuthenticated || cartItems?.length <= 0) {
  //       return;
  //     }

  //     const res = await fetch('/api/me/cart', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(cartItems),
  //     });

  //     if (!res.ok) {
  //       // This will activate the closest `error.js` Error Boundary
  //       // console.log('err');
  //       // TODO: you will need error boundaries to handle throwing errors inside of useEffect properly
  //       throw new Error('Failed ');
  //     }

  //     setCartItems([]);
  //   };

  //   updateAppUserCartWithLocalStorage();
  // }, [isAuthenticated, user, cartItems]);

  useEffect(() => {
    const populateCartItems = () => {
      // const cartData = isAuthenticated
      //   ? fetchCartFromServer()
      //   : setCartItems(localCartItems);

      // const cartData = isAuthenticated ? cartQuery.data : localCartItems;
      // setCartItems(cartData);
      if (isAuthenticated) {
        const cartData = cartQuery.data;
        setCartItems([]);
        // setLocalCartItems([]);
        setCartItems(cartData);
      } else {
        setCartItems(localCartItems);
      }
    };

    populateCartItems();
  }, [isAuthenticated, localCartItems]);

  const cartQuantity = cartItems?.reduce(
    // @ts-ignore
    (quantity, item) => item.quantity + quantity,
    // @ts-ignore
    0,
  );

  async function increaseCartQuantity(product: any | ProductWithAppUser) {
    const { id: productId } = product;

    const originalCartItems = [...cartItems];

    const updateCartItems = (curItems) => {
      if (curItems.find((item) => item.productId === productId) == null) {
        // TODO: FIX CART ID
        return [...curItems, { cartId: 1, productId, quantity: 1, ...product }];
      }

      return curItems.map((item) => {
        if (item.productId === productId) {
          // TODO: handle this error more appropriatly
          if (item.quantity === MAX_PURCHASE_QUANTITY) {
            throw Error('Can only purchase 5 copies of a given item at a time');
          }

          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    };

    try {
      if (!isAuthenticated) {
        setLocalCartItems((prevItems) => updateCartItems(prevItems));
        return;
      }

      setCartItems((prevItems) => updateCartItems(prevItems));

      const res = await fetch(`/api/app-users/me/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        throw new Error('Server update failed');
        // setCartItems(originalCartItems);
        // console.error('Server update failed: ', res.json());
        // throw new Error('Problem adding item to cart');
      }
    } catch (error) {
      console.error('Server update failed: ', error);
      isAuthenticated
        ? setCartItems(originalCartItems)
        : setLocalCartItems(originalCartItems);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        increaseCartQuantity,
        // setCartQuantity,
        // removeFromCart,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
