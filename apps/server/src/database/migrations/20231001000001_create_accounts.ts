import { Knex } from 'knex';

const TABLE_NAME = 'accounts';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();

    // Foreign Key
    table
      .integer('appUserId')
      .unsigned()
      .references('id')
      .inTable('appUsers')
      .notNullable()
      .onDelete('CASCADE');

    table.string('stripeAccountId').notNullable().unique();
    table.boolean('chargesEnabled').defaultTo(false);
    table.boolean('payoutsEnabled').defaultTo(false);
    table.boolean('detailsSubmitted').defaultTo(false);
    // TODO: Ensure that a user can only have one default account
    table.boolean('defaultAccount').defaultTo(true);

    table.timestamps(true, true);

    table.index('appUserId');
    table.index('defaultAccount');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
