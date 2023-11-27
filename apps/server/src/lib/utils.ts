// apps/server/src/lib/utils.ts

import crypto from 'crypto';

export const generateRandomBytes = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

export const sanitize = (obj: any) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      return value === null ? undefined : value;
    })
  );
};

export function isEmpty(obj: any) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function convertCamelCaseToSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, (match, letter) => `_${letter.toLowerCase()}`);
}

export function convertSnakeCaseToCamelCase(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  return Object.keys(obj).reduce((accumulator, key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
      letter.toUpperCase()
    );

    accumulator[camelCaseKey] = convertSnakeCaseToCamelCase(obj[key]);

    return accumulator;
  }, {});
}
