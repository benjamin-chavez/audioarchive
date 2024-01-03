// apps/client/src/app/cart/page.client.tsx

'use client';

import { useCart } from '@/contexts/cartContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { OrderSummary } from './components/order-summary';
import { CartItem } from './components/cart-item';

export default function CartPageClient({
  revalidateCart,
}: {
  revalidateCart: any;
}) {
  const { user, isLoading } = useUser();
  const { cartItems, storeCart, subtotal, estimatedTax, orderTotalPrice } =
    useCart();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7 ">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            {cartItems?.length > 0 ? (
              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {/* @ts-ignore */}
                {cartItems
                  .sort(
                    (a, b) =>
                      // @ts-ignore
                      new Date(a.cartItemCreatedAt).getTime() -
                      // @ts-ignore
                      new Date(b.cartItemCreatedAt).getTime(),
                  )
                  .map((cartItem, cartItemIdx) => (
                    // @ts-ignore
                    <CartItem
                      key={cartItem.productId}
                      cartItem={cartItem}
                      revalidateCart={revalidateCart}
                      cartItems={cartItems}
                      storeCart={storeCart}
                      user={user}
                    />
                  ))}
              </ul>
            ) : (
              <>
                <p className="text-black ">no items</p>
              </>
            )}
          </section>
          <OrderSummary
          // subtotal={subtotal}
          // orderTotal={orderTotalPrice}
          // cartItems={cartItems}
          />
        </form>
      </div>
    </div>
  );
}

// export const dynamic = 'force-dynamic';
