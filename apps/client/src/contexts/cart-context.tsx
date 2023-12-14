// apps/client/src/contexts/cart-context.tsx
'use client';

import { authAdapter } from '@/lib/auth';
import { getMyCart } from '@/services/client/cart.api-client';
import { CartItem, ProductWithAppUser } from '@shared/src';
import { useMutation, useQuery } from '@tanstack/react-query';
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
  cartQuantity: number;
  cartItems: CartItem[] | any[];
  // increaseCartQuantity: (product: any) => void;
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

  const [localCartItems, setLocalCartItems] = useLocalStorage<
    CartItem[] | any[]
  >('cart-items', []);

  const [cartItems, setCartItems] = useState(
    isAuthenticated ? [] : localCartItems,
  );

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => getMyCart,
    enabled: isAuthenticated,
  });

  const addCartItemMutation = useMutation({
    mutationFn: (product) => {
      return axios.post('/api/app-users/me/cart/items', product);
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setCartItems(localCartItems);
    }
  }, [isAuthenticated, localCartItems]);

  useEffect(() => {
    const populateCartItems = () => {
      // const cartData = isAuthenticated ? cartQuery.data?.items : localCartItems;

      // setCartItems(cartData);
      if (isAuthenticated && cartQuery.isSuccess) {
        // @ts-ignore
        setCartItems(cartQuery.data?.items || []);
      }
    };

    populateCartItems();
    // }, [isAuthenticated, localCartItems, cartQuery]);
  }, [isAuthenticated, cartQuery.isSuccess, cartQuery.data]);

  if (cartQuery.isLoading) return <h1>Loading...</h1>;
  if (cartQuery.isError) {
    // console.error(cartQuery.error);
    return <pre>{JSON.stringify(cartQuery.error)}</pre>;
  }
  // if (addCartItemMutation.isPending) return <h1>Mutating...</h1>;
  // if (addCartItemMutation.isError) return <h1>Mutating...</h1>;

  console.log('cartItems!:', cartItems);
  const cartQuantity = cartItems?.reduce(
    // @ts-ignore
    (quantity, item) => item.quantity + quantity,
    // @ts-ignore
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        // increaseCartQuantity,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
