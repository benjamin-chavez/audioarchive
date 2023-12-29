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

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const camelCaseToTitleCase = (str) => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return capitalizeFirstLetter(result);
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
