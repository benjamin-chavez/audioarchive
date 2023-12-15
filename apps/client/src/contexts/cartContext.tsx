'use client';
import { updateDatabaseCart } from '@/services/cart.api-service';
import { useUser } from '@auth0/nextjs-auth0/client';
// import { ApiCartData } from '@shared/src';
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
  // cartId?: number;
  // cartItems: ApiCartItem[];
  // setCartItems: () => any;
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

function mergeLocalStorageCartWithDBCart(cartItems, databaseCartItems) {
  if (databaseCartItems.length === 0) {
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
    const myFunc = async () => {
      if (!user) {
        setCartItems(localCartItems);
        return;
      }

      const response = await getMyCart();
      if (!response || !response.data) {
        return;
      }
      const { items: databaseCartItems, cartId: apiCartId } = response?.data;

      // const mergedCart = mergeLocalStorageCartWithDBCart(
      //   cartItems,
      //   databaseCartItems,
      // );
      // setCartItems(mergedCart);
      setCartItems(
        mergeLocalStorageCartWithDBCart(cartItems, databaseCartItems),
      );

      if (user) {
        await updateDatabaseCart({ cartId: apiCartId, cartItems });
      }

      if (localCartItems.length !== 0) {
        setLocalCartItems([]);
      }
    };

    myFunc();
  }, [localCartItems, user]);

  // useEffect(() => {
  //   const updateDatabaseCart = async () => {
  //     if (!user) {
  //       return;
  //     }

  //     const res = await fetch(`/api/app-users/me/cart/items`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ cartId, cartItems }),
  //     });
  //   };

  //   updateDatabaseCart();
  // }, [cartItems]);

  // useEffect(() => {
  //   const myFunc = async () => {
  //     console.log('useEffect - user');
  //     if (user) {
  //       const databaseCartItems = await getMyCart();
  //       const mergedCart = mergeLocalStorageCartWithDBCart(
  //         cartItems,
  //         databaseCartItems,
  //       );

  //       setLocalCartItems([]);
  //       setCartItems(mergedCart);
  //     } else {
  //       // setLocalCartItems([]);
  //       setCartItems(localCartItems);
  //     }
  //   };

  //   myFunc();
  // }, [user]);

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
