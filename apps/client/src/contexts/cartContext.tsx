// apps/client/src/contexts/cartContext.tsx

import { revalidateCart } from '@/app/cart/page';
import { handleAddToCart } from '@/app/products/[id]/page.client-side';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useState } from 'react';

// type CartContext = {
//   getItemQuantity: (id: number) => number;
//   increaseCartQuantity: (id: number) => void;
//   decreaseCartQuantity: (id: number) => void;
//   removeFromCart: (id: number) => void;
//   setItemQuantity: (id: number, quantity: number) => void;
//   cartQuantity: number;
//   cartItems: CartItem2[];
// };

// type CartItem = {
//   id: number;
//   quantity: number;
// };

// const CartContext = createContext({} as CartContext);
const CartContext = createContext({});

export function useCart() {
  return useContext(CartContext);
}

const fetchCart = async () => {
  const response = await fetch(`/api/app-users/me/cart`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState([]);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['cartData'],
    queryFn: fetchCart,
  });

  const { mutate } = useMutation({
    mutationFn: async (productId,) => {
      return await handleAddToCart(productId, revalidateCart);
      // return await api.addItem(newItem);
    },
    onSuccess: (data) => {
      // Handle successful mutation
    },
    onError: (error) => {
      // Handle error
    },
  });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const value = {
    // cartItems: data.data,
    // addItemToCart: (item) => addItemMutation.mutate(item)
    CartContext: data.data.items,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
