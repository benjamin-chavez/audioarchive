import { Knex } from 'knex';
import { Product } from '@shared/src/schemas';
declare module 'knex/types/tables' {
    interface Tables {
        products: Product;
        products_composite: Knex.CompositeTableType<Product, Pick<Product, 'name' | 'software' | 'genre' | 'stripeProductId'> & Partial<Pick<Product, 'created_at' | 'updated_at' | 'key' | 'label' | 'description'>>, Partial<Omit<Product, 'id'>>>;
    }
}
//# sourceMappingURL=productsTable.d.ts.map