import { Knex } from 'knex';

// TODO: ENSURE THE SIMPLICITY OF NOT HAVING A `wishlist_items` TABLE IS WORTH THE POTENTIAL FUTURE WORK OF ADDING IT

const TABLE_NAME = 'wishlist_entries';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments('id').primary();

    // Foreign Key
    t.integer('app_user_id')
      .unsigned()
      .references('id')
      .inTable('app_users')
      .notNullable()
      .onDelete('CASCADE');

    t.integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .notNullable()
      .onDelete('CASCADE');

    t.timestamps(true, true);

    t.unique(['app_user_id', 'product_id']);
    t.index(['created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
