// apps/client/src/app/(app-users)/cart/components/order-summary.tsx

'use client';

import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import CheckoutButton from './checkout-button';
import { useCart } from '@/contexts/cartContext';
import { CURRENCY, formatAmountForDisplay } from '@/lib/cart-calculations';

export function OrderSummary({}: {}) {
  const { cartItems, storeCart, subtotal, estimatedTax, orderTotalPrice } =
    useCart();

  return (
    <>
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
            <dd className="text-sm font-medium text-gray-900">
              {formatAmountForDisplay(subtotal, CURRENCY)}
            </dd>
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
              {formatAmountForDisplay(estimatedTax, CURRENCY)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="text-base font-medium text-gray-900">Order total</dt>
            <dd className="text-base font-medium text-gray-900">
              {formatAmountForDisplay(orderTotalPrice, CURRENCY)}
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
