// apps/client/src/app/cart/page.tsx

'use client';

import { useCart } from '@/contexts/cartContext';
import { CheckIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import CheckoutButton from './checkout-button';
import RemoveFromCartButton from './remove-from-cart-button';
import { useEffect, useState } from 'react';

// function calculatePriceSubtotal(cartItems: any): number {
//   // @ts-ignore
//   const subtotal = cartItems?.reduce((sum, cartItem) => {
//     return sum + cartItem.price;
//   }, 0);
//   // console.log(subtotal);
//   return subtotal;
// }

// function calculateTaxEstimate(): number {
//   return 0.0;
// }

// function calculateOrderTotal({
//   subtotal,
//   estimatedTax,
// }: {
//   subtotal: number;
//   estimatedTax: number;
// }): number {
//   return subtotal + estimatedTax;
// }

function OrderSummary({
  subtotal,
  orderTotal,
  cartItems,
}: {
  subtotal: number;
  orderTotal: number;
  cartItems: any;
}) {
  return (
    <>
      {/* Order summary */}
      <section
        aria-labelledby="summary-heading"
        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      >
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
          Order summary
        </h2>

        <dl className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-600">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">${subtotal}</dd>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="flex text-sm text-gray-600">
              <span>Tax estimate</span>
              <a
                href="#"
                className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">
                  Learn more about how tax is calculated
                </span>
                <QuestionMarkCircleIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              {/* ${calculateTaxEstimate()} */}$0
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="text-base font-medium text-gray-900">Order total</dt>
            <dd className="text-base font-medium text-gray-900">
              ${orderTotal}
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <CheckoutButton cartItems={cartItems} />
        </div>
      </section>
    </>
  );
}

function CartItem({
  cartItem,
  cartItemIdx,
  revalidateCart,
}: {
  cartItem: any;
  cartItemIdx: number;
  revalidateCart: any;
}) {
  console.log('cartItem::: ', cartItem);
  return (
    <>
      <li className="flex py-6 sm:py-10">
        <div className="flex-shrink-0">
          <img
            src={cartItem.imgS3Url}
            // alt={product.imageAlt}
            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm">
                  <a
                    href={`/products/${cartItem.productId}`}
                    className="font-medium text-gray-700 hover:text-gray-800"
                  >
                    {cartItem.name}
                  </a>
                </h3>
              </div>
              <div className="mt-1 flex text-sm">
                <p className="text-gray-500">{cartItem.daw}</p>
                {/* {product.bpm ? (
                  <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                    {product.bpm} bpm
                  </p>
                ) : null} */}
              </div>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {cartItem.price}
              </p>
            </div>

            <div className="mt-4 sm:mt-0 sm:pr-9">
              <label htmlFor={`quantity-${cartItemIdx}`} className="sr-only">
                Quantity, {cartItem.name}
              </label>
              <select
                id={`quantity-${cartItemIdx}`}
                name={`quantity-${cartItemIdx}`}
                value={cartItem.quantity}
                className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>

              <div className="absolute right-0 top-0">
                <RemoveFromCartButton
                  cartItem={cartItem}
                  revalidateCart={revalidateCart}
                />
              </div>
            </div>
          </div>

          <p className="mt-4 flex space-x-2 text-sm text-gray-700">
            {/* {product.inStock ? ( */}
            <CheckIcon
              className="h-5 w-5 flex-shrink-0 text-green-500"
              aria-hidden="true"
            />
            {/* ) : (
              <ClockIcon
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                aria-hidden="true"
              />
            )} */}

            <span>
              {/* {product.inStock ? 'In stock' : `Ships in ${product.leadTime}`} */}
              In stock
            </span>
          </p>
        </div>
      </li>
    </>
  );
}

export default function CartPageClient({
  revalidateCart,
}: {
  revalidateCart: any;
}) {
  const { cartItems, setCartItems } = useCart();

  // if (user) {
  //   const res = await getMyCart();
  //   // console.log('res: ', JSON.stringify(res, null, 2));
  //   setCartItems(res.data.items);
  // }

  // if (!cartItems) {
  //   return;
  // }

  // const { items: cartItems } = res.data;
  // const subtotal = calculatePriceSubtotal(cartItems);
  // const estimatedTax = calculateTaxEstimate();
  // const orderTotal = calculateOrderTotal({ subtotal, estimatedTax });

  const subtotal = 0;
  const estimatedTax = 0;
  const orderTotal = 0;

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
                {cartItems.map((cartItem, cartItemIdx) => (
                  // @ts-ignore
                  <CartItem
                    key={cartItem.productId}
                    cartItem={cartItem}
                    revalidateCart={revalidateCart}
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
            subtotal={subtotal}
            orderTotal={orderTotal}
            cartItems={cartItems}
          />
        </form>
      </div>
    </div>
  );
}

// export const dynamic = 'force-dynamic';
