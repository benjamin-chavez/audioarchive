'use client';
// import { updateDatabaseCart } from '@/services/cart.api-service';
import { useUser } from '@auth0/nextjs-auth0/client';

import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';

export type ApiCartItem = {
  cartItemId?: number;
  quantity: number;
  productId: number;
  name: string;
  genre: string;
  daw: string;
  bpm: number;
  price: number;
  imgS3Key: string;
  imgS3Url: string;
  sellerId: number;
  sellerUsername: string;
};

export type ApiCartData = {
  cartId?: number;
  cartItems: ApiCartItem[];
};

export type CartContext = {
  storeCart: (updatedCartItems: any) => void;
  setCartItems: Dispatch<any>;
  setLocalCartItems: Dispatch<any>;
} & ApiCartData;

const CartContext = createContext<CartContext | null>(null);

export function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

async function updateDatabaseCart({
  cartId,
  cartItems,
}: {
  // cartId: number;
  // cartItems: any;
  cartId: any;
  cartItems: any;
}) {
  const res = await fetch(`/api/app-users/me/cart/items`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartId, cartItems }),
  });

  // if (!res.ok) {
  //   throw new Error('Failed to update cart');
  // }

  return res.json();
}

function mergeLocalStorageCartWithDBCart(cartItems, databaseCartItems) {
  if (!databaseCartItems || databaseCartItems.length === 0) {
    return cartItems;
  }

  if (cartItems.length === 0) {
    return databaseCartItems;
  }

  const mergedCart = Object.values(
    [...cartItems, ...databaseCartItems].reduce((acc, item) => {
      acc[item.productId] = {
        ...item,
        quantity:
          (acc[item.productId] ? acc[item.productId].quantity : 0) +
          item.quantity,
      };
      return acc;
    }, {}),
  );

  return mergedCart;
}

export function CartProvider({
  children,
  getMyCart,
}: {
  children: ReactNode;
  getMyCart: any;
}) {
  const { user } = useUser();
  const [localCartItems, setLocalCartItems] = useLocalStorage<ApiCartItem[]>(
    'cart-items',
    [],
  );
  const [cartItems, setCartItems] = useState<ApiCartItem[]>(
    localCartItems || [],
  );

  useEffect(() => {
    const synchronizeCart = async () => {
      if (!user) {
        setCartItems(localCartItems);
        return;
      }

      const response = await getMyCart();
      if (!response || !response.data) {
        return;
      }
      const { items: databaseCartItems, cartId: apiCartId } = response?.data;

      const mergedCart = mergeLocalStorageCartWithDBCart(
        cartItems,
        databaseCartItems,
      );
      setCartItems(mergedCart);
      // setCartItems(
      //   mergeLocalStorageCartWithDBCart(cartItems, databaseCartItems),
      // );

      console.log('mergedCart: ', mergedCart);

      // @ts-ignore
      const testing = await updateDatabaseCart({
        cartId: apiCartId,
        cartItems: mergedCart,
      });
      console.log('testing: ', testing);

      if (localCartItems.length !== 0) {
        setLocalCartItems([]);
      }
    };

    synchronizeCart();
  }, [localCartItems, user]);

  const storeCart = useCallback(
    (updatedCartItems) => {
      if (user) {
        setCartItems(updatedCartItems);
      } else {
        setLocalCartItems(updatedCartItems);
      }
    },
    [user, setCartItems, setLocalCartItems],
  );

  const contextValue = useMemo(
    () => ({
      cartId: undefined,
      cartItems,
      setCartItems,
      storeCart,
      setLocalCartItems,
    }),
    [cartItems, setCartItems, storeCart, setLocalCartItems],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
