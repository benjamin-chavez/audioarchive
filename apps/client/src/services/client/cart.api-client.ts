// apps/client/src/services/cart.api-client.ts
'use client';

import { AddToCartResponse } from '@shared/src';
import axios from 'axios';

// const MAX_PURCHASE_QUANTITY = 5;

// const res = await fetch(`/api/app-users/me/cart/items`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ productId }),
// });

// if (!res.ok) {
//   setCartItems(originalCartItems);
//   console.error('Server update failed: ', res.json());
//   // throw new Error('Problem adding item to cart');
// }

export async function addProductToCart({ productId }: { productId: number }) {
  try {
    const res = await axios.post(`/api/app-users/me/cart/items`, {
      productId,
    });

    return res.data;
  } catch (error) {
    console.error('Failed to add item to cart:', error);
  }
}

export async function addToCart({ productId }: { productId: number }) {
  try {
    // const res: AddToCartResponse = await axios.post(
    const res = await axios.post(`/api/app-users/me/cart/items`, {
      productId,
    });

    return res.data;
  } catch (error) {
    console.error('Failed to add item to cart:', error);
  }
}

// const res = await fetch(`api/app-users/me/cart/items/${cartItemId}`, {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export async function getMyCart() {
  try {
    const res = await axios.get(`api/app-users/me/cart`);

    console.log('res: ', res);
    console.log(res.statusText);
    // @ts-ignore
    // if (!res.ok) {
    if (res.statusText !== 'OK') {
      throw new Error('Failed to fetch Shopping Cart');
    }

    return res.data?.data;
  } catch (error) {
    console.error('Failed to get cart:', error);
  }
}
