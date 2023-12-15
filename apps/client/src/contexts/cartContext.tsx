'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
// import { ApiCartData } from '@shared/src';
import {
  Dispatch,
  ReactNode,
  createContext,
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
      console.log('myFunc');
      if (user) {
        const databaseCartItems = await getMyCart();

        // TODO: merge databaseCartItems with localCartItems before emptying
        if (localCartItems.length !== 0) {
          setLocalCartItems([]);
        }

        setCartItems(databaseCartItems);
      } else {
        // setLocalCartItems([]);
        // console.log('localCartItems: ', localCartItems);
        setCartItems(localCartItems);
      }
    };

    myFunc();
    console.log(cartItems);
  }, [localCartItems, user]);
  // }, [user]);

  function storeCart(updatedCartItems) {
    console.log('store cart: ', updatedCartItems);

    if (user) {
      // TODO: Post request to api
      setCartItems(updatedCartItems);
    } else {
      setLocalCartItems(updatedCartItems);
    }
  }

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
