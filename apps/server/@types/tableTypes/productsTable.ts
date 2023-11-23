// apps/server/@types/tableTypes/productsTable.ts
import { Knex } from 'knex';
import { Product } from '@shared/src/schemas';

// TODO: accountId:
declare module 'knex/types/tables' {
  // declare module 'knex/types/tables.js' {
  interface Tables {
    products: Product;
    products_composite: Knex.CompositeTableType<
      Product,
      Pick<Product, 'name' | 'software' | 'genre' | 'stripeProductId'> &
        Partial<
          Pick<
            Product,
            'created_at' | 'updated_at' | 'key' | 'label' | 'description'
          >
        >,
      Partial<Omit<Product, 'id'>>
    >;
  }
}
