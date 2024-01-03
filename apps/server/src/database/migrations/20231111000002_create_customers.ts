// apps/server/src/database/migrations/20231111000002_create_customers.ts

import { Knex } from 'knex';

// const TABLE_NAME = 'stripeCustomers';
const TABLE_NAME = 'customers';

// TODO: Decide if you really need this as a separate table, or if you should just add a `stripe_customer_id` field to the appUser table
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table
      .integer('app_user_id')
      .unsigned()
      .references('id')
      .inTable('app_users')
      .notNullable();
    table.string('stripe_customer_id').unique();
    // table.timestamps(true, true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('stripe_customer_id');
  });
}

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
