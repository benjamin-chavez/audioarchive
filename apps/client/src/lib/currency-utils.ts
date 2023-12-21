// apps/client/src/lib/currency-utils.ts

export const CURRENCY = 'usd';

// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0;
export const MAX_AMOUNT = 5000.0;
export const AMOUNT_STEP = 5.0;

export function formatAmountForDisplay(
  amount: number,
  currency: string,
): string {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount);
}

export function formatAmountForStripe(
  amount: number,
  currency: string,
): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export function convertDollarsToCents(price: number) {
  // const priceInCents = Math.round(price * 100);
  // return priceInCents;
  return Math.round(price * 100);
}

export function convertCentsToDollars(cents: number) {
  return (cents / 100).toFixed(2);
}

// export function calculatePriceSubtotal(cartItems: any): number {
//   // @ts-ignore
//   const subtotal = cartItems?.reduce((sum, cartItem) => {
//     return sum + cartItem.price;
//   }, 0);
//   // console.log(subtotal);
//   return subtotal;
// }

// export function calculateTaxEstimate(): number {
//   return 0.0;
// }

// export function calculateOrderTotal({
//   subtotal,
//   estimatedTax,
// }: {
//   subtotal: number;
//   estimatedTax: number;
// }): number {
//   // TODO: ENSURE THAT RETURN VALUE IS NOT `NAN`
//   return subtotal + estimatedTax;
// }

// convertCentsToDollars;
// const storedValue = 2999;

// const dollz = convertCentsToDollars(storedValue);
// console.log(dollz);
// console.log(formatAmountForDisplay(29.99, CURRENCY));
// console.log(formatAmountForStripe(29.99, CURRENCY));
