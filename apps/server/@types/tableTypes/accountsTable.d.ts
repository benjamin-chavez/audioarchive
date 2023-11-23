import { Knex } from 'knex';
import { Account } from '@shared/src/schemas';
declare module 'knex/types/tables' {
    interface Tables {
        accounts: Account;
        accounts_composite: Knex.CompositeTableType<Account, Omit<Account, 'id'>, Partial<Omit<Account, 'id'>>>;
    }
}
//# sourceMappingURL=accountsTable.d.ts.map