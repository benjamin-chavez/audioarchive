// apps/client/tests/src/contexts/cartContext.test.ts

// when a guest user with items in their guest cart/local storage cart logs in for the first time, there cartItems are properly added to/merged with a new database cart
//  - mergeLocalStorageCartWithDBCart;
//  - broken commit => working commit:
//   2fba4d853596b75b1d697327119e186117217f72 => 1570fedf88db3c9455994860685bb24d3c810620

// Write test to verify the cart items are sorted in order of creation
// make sure it works even when localStorage cartItems are merged in with
// Database cart items.

// Write test to verify that cart items cannot exceed 5 (MAX_CART_ITEM_QUANTITY).
// Write test to verify that this limit is not exceeded even when merging carts
