// apps/server/@types/tableTypes/appUsersTable.ts

import { Knex } from 'knex';
import { AppUser } from '@shared/src/schemas';

declare module 'knex/types/tables' {
  interface Tables {
    users: AppUser;
    users_composite: Knex.CompositeTableType<
      AppUser,
      Pick<
        AppUser,
        'authId' | 'firstName' | 'lastName' | 'username' | 'email'
      > &
        Partial<Pick<AppUser, 'created_at' | 'updated_at'>>,
      Partial<Omit<AppUser, 'id'>>
    >;
  }
}
