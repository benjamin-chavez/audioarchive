// apps/client/src/app/cart-context-test/utils/formatCurrency.ts

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
