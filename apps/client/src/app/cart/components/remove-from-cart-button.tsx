// apps/client/src/app/cart/remove-from-cart-button.tsx
'use client';

import { useCart } from '@/contexts/cart-context';
import { XMarkIcon } from '@heroicons/react/20/solid';

// export async function handleRemoveFromCart({
export function handleRemoveFromCart({
  cartItemId,
  // revalidateCart,
  removeFromCart,
}: {
  cartItemId: number | any;
  // revalidateCart: () => Promise<void>;
  removeFromCart: any;
}) {
  // const res = await fetch(`api/app-users/me/cart/items/${cartItemId}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  // if (!res.ok) {
  //   throw new Error('Failed to removed item from cart');
  // }

  // await revalidateCart();
  // return res.json();

  removeFromCart(cartItemId);
}

export default function RemoveFromCartButton({
  cartItemId, // revalidateCart,
}: {
  cartItemId: number | any;
  // revalidateCart: () => Promise<void>;
}) {
  const { removeFromCart } = useCart();

  return (
    <div>
      <button
        type="button"
        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
        onClick={() =>
          handleRemoveFromCart({
            cartItemId: cartItemId,
            // revalidateCart,
            removeFromCart,
          })
        }
      >
        <span className="sr-only">Remove</span>
        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
