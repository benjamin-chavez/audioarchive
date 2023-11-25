// apps/server/src/database/migrations/20231111000002_create_customers.ts

import { Knex } from 'knex';

// const TABLE_NAME = 'stripeCustomers';
const TABLE_NAME = 'customers';

// TODO: Decide if you really need this as a separate table, or if you should just add a `stripeCustomerId` field to the appUser table
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table
      .integer('appUserId')
      .unsigned()
      .references('id')
      .inTable('appUsers')
      .notNullable();
    table.string('stripeCustomerId').unique();
    // table.timestamps(true, true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('stripeCustomerId');
  });
}

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
