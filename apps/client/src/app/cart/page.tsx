// apps/client/src/app/cart/page.tsx
import 'server-only';
import { revalidateTag } from 'next/cache';
import CartPageClient from './page.client';
import { getSession } from '@auth0/nextjs-auth0';
import { getMyCart } from '@/lib/data/me';

export async function revalidateCart() {
  'use server';

  // TODO: Figure out if you should use revalidateTag or revalidatePath
  revalidateTag('cart');
  // revalidatePath('/cart');
}

export default async function CartPage() {
  const session = await getSession();
  const user = session ? session.user : null;
  // const { cartItems, setCartItems, setLocalCartItems } = useCart();

  // let databaseCartItems;
  if (user) {
    //   databaseCartItems = await getMyCart();
    // const res = await getMyCart();
    // // console.log('res: ', JSON.stringify(res, null, 2));
    // setCartItems(res.data.items);
    revalidateCart();
  }

  // if (!cartItems) {
  //   return;
  // }

  // const { items: cartItems } = res.data;
  return (
    <div>
      <CartPageClient revalidateCart={revalidateCart} />
    </div>
  );
}
