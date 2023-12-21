"use strict";
// apps/client/src/lib/currency-utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDollarsToCents = exports.formatAmountForStripe = exports.formatAmountForDisplay = exports.AMOUNT_STEP = exports.MAX_AMOUNT = exports.MIN_AMOUNT = exports.CURRENCY = void 0;
exports.CURRENCY = 'usd';
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
exports.MIN_AMOUNT = 10.0;
exports.MAX_AMOUNT = 5000.0;
exports.AMOUNT_STEP = 5.0;
function formatAmountForDisplay(amount, currency) {
    var numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });
    return numberFormat.format(amount);
}
exports.formatAmountForDisplay = formatAmountForDisplay;
function formatAmountForStripe(amount, currency) {
    var numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });
    var parts = numberFormat.formatToParts(amount);
    var zeroDecimalCurrency = true;
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        if (part.type === 'decimal') {
            zeroDecimalCurrency = false;
        }
    }
    return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
exports.formatAmountForStripe = formatAmountForStripe;
function convertDollarsToCents(price) {
    // const priceInCents = Math.round(price * 100);
    // return priceInCents;
    return Math.round(price * 100);
}
exports.convertDollarsToCents = convertDollarsToCents;
function convertCentsToDollars(cents) {
    return (cents / 100).toFixed(2);
}
// convertCentsToDollars;
var storedValue = 2999;
var dolls = convertCentsToDollars(storedValue);
console.log(dolls);
// console.log(formatAmountForDisplay(29.99, CURRENCY));
console.log(formatAmountForStripe(29.99, exports.CURRENCY));
