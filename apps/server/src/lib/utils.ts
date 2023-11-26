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
