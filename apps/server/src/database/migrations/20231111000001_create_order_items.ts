// apps/server/src/database/migrations/20231111000001_create_order_items.ts

import { Knex } from 'knex';

const TABLE_NAME = 'order_items';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table
      .integer('orderId')
      .unsigned()
      .references('id')
      .inTable('orders')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('productId')
      .unsigned()
      .references('id')
      .inTable('products')
      .notNullable();
    table.timestamps(true, true);
  });
}

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
