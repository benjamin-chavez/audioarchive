import { Knex } from 'knex';

const TABLE_NAME = 'accounts';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();

    // Foreign Key
    table
      .integer('app_user_id')
      .unsigned()
      .references('id')
      .inTable('app_users')
      .notNullable()
      .onDelete('CASCADE');

    table.string('stripe_account_id').notNullable().unique();
    table.boolean('charges_enabled').defaultTo(false);
    table.boolean('payouts_enabled').defaultTo(false);
    table.boolean('details_submitted').defaultTo(false);
    // TODO: Ensure that a user can only have one default account
    table.boolean('default_account').defaultTo(true);

    table.timestamps(true, true);

    table.index('app_user_id');
    table.index('default_account');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
