// apps/client/src/app/(app-users)/cart/components/cart-item.tsx

'use client';

import { Badge } from '@/components/ui/badge';
import { CheckIcon } from '@heroicons/react/20/solid';
import RemoveFromCartButton from './remove-from-cart-button';

export async function handleSetCartItemQuantity({
  productId,
  quantity,
  storeCart,
}: {
  productId: any;
  quantity: any;
  storeCart: any;
}) {
  try {
    const res = await fetch(`/api/app-users/me/cart/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    if (!res.ok) {
      throw new Error('Problem updating cart item quantity');
    }

    const {
      data: { items: updatedCart },
    } = await res.json();

    storeCart(updatedCart);

    return updatedCart;
  } catch (error) {
    console.error('Failed to add item to cart:', error);
  }
}

export function CartItem({
  cartItems,
  cartItem,
  cartItemIdx,
  revalidateCart,
  storeCart,
  user,
}: {
  cartItems: any;
  cartItem: any;
  cartItemIdx: number;
  revalidateCart: any;
  storeCart: any;
  user: any;
}) {
  // console.log('cartItem::: ', cartItem);
  // const { setCartQuantity } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    console.log('cartItems', cartItems);

    const newQuantity = parseInt(e.target.value);
    const updatedItem = { ...cartItem, quantity: newQuantity };
    console.log('updatedItem', updatedItem);
    // setCartQuantity(cartItem, newQuantity);

    const filteredCartItems = cartItems.filter(
      (item) => item.productId !== cartItem.productId,
    );
    const updatedCartItems = [...filteredCartItems, updatedItem];
    console.log('updatedCartItems', updatedCartItems);

    if (user) {
      handleSetCartItemQuantity({
        productId: cartItem.productId,
        quantity: newQuantity,
        storeCart,
      });
    } else {
      storeCart(updatedCartItems);
    }
  };

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
                onChange={handleQuantityChange}
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

          <div className="">
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
            {cartItem.quantity > 1 && (
              <Badge>
                You have more than one copy of this item in your cart
              </Badge>
            )}
          </div>
        </div>
      </li>
    </>
  );
}
