// apps/server/@types/tableTypes/shopping-carts-table.ts

import { Knex } from 'knex';
import { Cart } from '@shared/src/schemas';

declare module 'knex/types/tables' {
  interface Tables {
    carts: Cart;
    carts_composite: Knex.CompositeTableType<
      Cart,
      Pick<Cart, 'appUserId'> & Partial<Omit<Cart, 'id'>>,
      Partial<Omit<Cart, 'id'>>
    >;
  }
}
