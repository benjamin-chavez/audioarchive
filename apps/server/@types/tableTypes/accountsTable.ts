// apps/server/@types/tableTypes/accountsTable.ts
import { Knex } from 'knex';
import { Account } from '@shared/src/schemas';

declare module 'knex/types/tables' {
  interface Tables {
    accounts: Account;
    accounts_composite: Knex.CompositeTableType<
      Account,
      Omit<Account, 'id'>,
      Partial<Omit<Account, 'id'>>
    >;
  }
}

// declare module 'knex/types/tables' {
//   // declare module 'knex/types/tables.js' {
//   interface Tables {
//     accounts: Account;
//     accounts_composite: Knex.CompositeTableType<
//       Account,
//       Pick<
//         Account,
//         | 'appUserId'
//         | 'stripeAccountId'
//         | 'chargesEnabled'
//         | 'payoutsEnabled'
//         | 'detailsSubmitted'
//         | 'defaultAccount'
//       > &
//         Partial<Pick<Account, 'createdAt' | 'updatedAt'>>,
//       Partial<Omit<Account, 'id'>>
//     >;
//   }
// }
