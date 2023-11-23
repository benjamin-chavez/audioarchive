// apps/server/@types/tableTypes/shopping-cart-items-table.ts

import { Knex } from 'knex';
import { CartItem } from '@shared/src/schemas';

declare module 'knex/types/tables' {
  interface Tables {
    cart_items: CartItem;
    cartItems_composite: Knex.CompositeTableType<
      CartItem,
      Pick<CartItem, 'cartId' | 'productId'> & Partial<Omit<CartItem, 'id'>>,
      Partial<Omit<CartItem, 'id'>>
    >;
  }
}
