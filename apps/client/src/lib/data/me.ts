// apps/client/src/data/me.ts
// import 'server-only';
'use server';

import { getAccessToken } from '@auth0/nextjs-auth0';
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

// export async function getMyProducts({ accessToken }: { accessToken: any }) {
// @ts-ignore
// export async function getMyProducts(accessToken) {
export async function getMyProducts() {
  const { accessToken } = await getAccessToken();

  const res = await fetch(`${BASE_URL}/app-users/me/products`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export async function getMyStripeAccounts() {
  const { accessToken } = await getAccessToken();

  const res = await fetch(`${BASE_URL}/app-users/me/accounts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Stripe Accounts ');
  }

  return res.json();
}

export async function getMyProductById(productId: number) {
  const { accessToken } = await getAccessToken();

  const res = await fetch(`${BASE_URL}/app-users/me/products/${productId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch product');
  }

  // const test = await res.json();

  return res.json();
  // return test;
}

export async function getMe() {
  const { accessToken } = await getAccessToken();

  const res = await fetch(`${BASE_URL}/app-users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch me');
  }

  // const test = await res.json();

  return res.json();
}

export async function getMyCart() {
  // 'use server';

  try {
    const { accessToken } = await getAccessToken();

    const res = await fetch(`${BASE_URL}/app-users/me/cart`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Shopping Cart');
    }

    const response = await res.json();
    console.log('getMyCart:', response);

    if (!response.data) {
      throw new Error('No Response Data');
    }

    return response;
  } catch (error) {
    // TODO: FINISH HANDLING ERRORS HERE
    // PROBABLY SHOULD REDIRECT TO LOGIN?
    return {};
  }
}
