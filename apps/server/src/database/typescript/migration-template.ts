// // apps/server/src/database/migration-template.ts

// import { Knex } from 'knex';

// const TABLE_NAME = '';

// export async function up(knex: Knex): Promise<void> {
//   return knex.schema.createTable(TABLE_NAME, (table) => {
//     table.increments('id').primary();
//     table.timestamps(true, true);
//   });
// }

// exports.down = function (knex: Knex): Promise<void> {
//   return knex.schema.dropTableIfExists(TABLE_NAME);
// };
