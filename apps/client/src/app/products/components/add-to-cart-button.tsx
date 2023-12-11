// apps/client/src/app/products/components/add-to-cart-button.tsx
'use client';

import { useCart } from '@/contexts/cart-context';
import { Product, ProductWithAppUser } from '@shared/src';

export async function handleAddToCart({
  product,
  increaseCartQuantity,
}: {
  product: Product;
  increaseCartQuantity: (productId: any) => void;
}) {
  try {
    increaseCartQuantity(product);
  } catch (error) {
    console.error('Failed to add item to cart:', error);
  }
}

// export async function handleAddToCart({
//   productId,
//   revalidateCart,
// }: {
//   productId: number;
//   revalidateCart: () => Promise<void>;
// }) {
//   try {
//     console.log('productId', productId);
//     const res = await fetch(`/api/app-users/me/cart/items`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ productId }),
//       // body: product,
//     });

//     if (!res.ok) {
//       throw new Error('Problem adding item to cart');
//     }

//     const updatedCart = await res.json();
//     // console.log('updatedCart', updatedCart);

//     await revalidateCart();
//     // TODO: NEED TO REVALIDATE CACHE
//   } catch (error) {
//     console.error('Failed to add item to cart:', error);
//   }
// }

function AddToCartButton({ product }: { product: ProductWithAppUser }) {
  const { increaseCartQuantity } = useCart();

  return (
    <div>
      {' '}
      <button
        type="button"
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        onClick={() =>
          handleAddToCart({
            product,
            increaseCartQuantity,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
export { AddToCartButton };
