// apps/client/src/lib/utils.ts

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(length: number) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 36).toString(36),
  ).join('');
}

export function convertDollarsToCents(price: number) {
  // const priceInCents = Math.round(price * 100);
  // return priceInCents;
  return Math.round(price * 100);
}
