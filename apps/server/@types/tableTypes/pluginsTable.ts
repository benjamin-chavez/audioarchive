// apps/server/@types/tableTypes/pluginsTable.ts
import { Knex } from 'knex';
import { Plugin } from '@shared/src/schemas';

declare module 'knex/types/tables' {
  // declare module 'knex/types/tables.js' {
  interface Tables {
    plugins: Plugin;
    plugins_composite: Knex.CompositeTableType<
      Plugin,
      Pick<
        Plugin,
        | 'pluginName'
        | 'manufacturer'
        | 'pluginVersion'
        | 'pluginProductUrl'
        | 'dawId'
        | 'isApproved'
      > &
        Partial<Pick<Plugin, 'created_at' | 'updated_at'>>,
      Partial<Omit<Plugin, 'id'>>
    >;
  }
}
