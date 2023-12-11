// apps/client/src/app/new-cart/page.tsx
'use client';

import { useCart } from '@/contexts/cartContext';

function NewCart() {
  // @ts-ignore
  const { CartContext } = useCart();

  // console.log('CartContext: ', CartContext);

  const cartItems = CartContext;
  console.log(cartItems);
  const products = cartItems.map((item) => item.product);

  if (cartItems) {
    return (
      <div>
        <h1>NewCart</h1>

        {cartItems.map((cartItem) => {
          console.log(cartItem);

          return (
            <div key={cartItem.id} className="bg-red-500">
              {cartItem.product.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default NewCart;
