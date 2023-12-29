// apps/server/src/database/migrations/20231229000002_create_product_ratings_table.ts

import { Knex } from 'knex';

const TABLE_NAME = 'product_ratings';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments('id').primary();

    t.integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .notNullable()
      .onDelete('CASCADE');

    t.integer('app_user_id')
      .unsigned()
      .references('id')
      .inTable('app_users')
      .notNullable()
      .onDelete('CASCADE');

    t.integer('rating').unsigned().notNullable();

    t.timestamps(true, true);

    t.unique(['app_user_id', 'product_id']);
    t.index(['product_id']);
    t.index(['app_user_id']);
    t.index(['rating']);
    t.index(['created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
