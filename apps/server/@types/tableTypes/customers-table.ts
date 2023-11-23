// apps/server/@types/tableTypes/customers-table.ts

import { Knex } from 'knex';
import { StripeCustomer } from '@shared/src/schemas';

declare module 'knex/types/tables' {
  interface Tables {
    stripe_customers: StripeCustomer;
    stripe_customers_composite: Knex.CompositeTableType<
      StripeCustomer,
      Omit<StripeCustomer, 'id'>,
      Partial<Omit<StripeCustomer, 'id'>>
    >;
  }
}
