// apps/client/src/app/cart/checkout-button.tsx
'use client';

import { useRouter } from 'next/navigation';

const handleCheckoutSession = async ({ cartItems }: { cartItems: any }) => {
  const res = await fetch(`/api/app-users/me/cart/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItems),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to create checkout session');
  }

  const { data } = await res.json();

  return data;
};

// eslint-disable-next-line @next/next/no-async-client-component
export default async function CheckoutButton({
  cartItems,
}: {
  cartItems: any;
}) {
  const router = useRouter();
  const handleCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const session = await handleCheckoutSession({ cartItems });
      router.push(session.url);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <>
      {' '}
      <button
        type="submit"
        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        onClick={(e) => handleCheckout(e)}
      >
        Checkout
      </button>
    </>
  );
}
