// apps/client/src/app/cart/remove-from-cart-button.tsx
'use client';

import { useCart } from '@/contexts/cartContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import { XMarkIcon } from '@heroicons/react/20/solid';

export async function handleRemoveFromCart({
  cartItem,
  revalidateCart,
  cartItems,
  setLocalCartItems,
  storeCart,
  user,
}: {
  cartItem: any;
  revalidateCart: () => Promise<void>;
  cartItems: any;
  setLocalCartItems: (items: any[]) => void;
  storeCart: any;
  user: any;
}) {
  if (user) {
    const res = await fetch(
      `api/app-users/me/cart/items/${cartItem.cartItemId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      throw new Error('Failed to removed item from cart');
    }

    await revalidateCart();
    return res.json();
  } else {
    // TODO: There might be a bug here. if middle items are duplicated then only one of them is removed/filtered out
    //       There shouldn't be duplicates anyway, but there still might be a rendering issue
    console.log('old: ', cartItems);
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== cartItem.productId,
    );

    console.log('new: ', updatedCartItems);
    storeCart(updatedCartItems);

    // setLocalCartItems(updatedCartItems);
  }
}

export default function RemoveFromCartButton({
  cartItem,
  revalidateCart,
}: {
  cartItem: any;
  revalidateCart: () => Promise<void>;
}) {
  const { cartItems, setLocalCartItems, storeCart } = useCart();
  const { user } = useUser();

  return (
    <div>
      <button
        type="button"
        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
        onClick={() =>
          handleRemoveFromCart({
            cartItem: cartItem,
            revalidateCart,
            user,
            cartItems,
            storeCart,
            setLocalCartItems,
          })
        }
      >
        <span className="sr-only">Remove</span>
        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
