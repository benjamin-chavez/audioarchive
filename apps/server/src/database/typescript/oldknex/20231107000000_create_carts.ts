import { Knex } from 'knex';

const TABLE_NAME = 'carts';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(
    "CREATE TYPE cart_status_type AS ENUM ('active', 'purchased', 'archived', 'abandoned')"
  );

  // return knex.schema.createTable(TABLE_NAME, (table) => {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();

    // Foreign Key
    table
      .integer('app_user_id')
      .unsigned()
      .references('id')
      .inTable('app_users')
      .notNullable()
      .onDelete('CASCADE');

    table
      .specificType('status', 'cart_status_type')
      .notNullable()
      .defaultTo('active');

    // table.timestamp('lastActivityAt');
    // table.boolean('reminder_sent');

    table.timestamps(true, true);
    table.index('id');
  });

  await knex.schema.raw(`
    CREATE UNIQUE INDEX idx_unique_active_cart
    ON ${TABLE_NAME}(app_user_id)
    WHERE status = 'active';
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
