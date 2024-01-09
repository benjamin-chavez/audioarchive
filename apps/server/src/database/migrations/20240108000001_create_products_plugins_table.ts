// apps/server/src/database/migration-template.ts

import { Knex } from 'knex';

const TABLE_NAME = 'products_plugins';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (t) => {
    t.primary(['product_id', 'plugin_id']);

    t.integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');

    t.integer('plugin_id')
      .unsigned()
      .references('id')
      .inTable('plugins')
      .onDelete('CASCADE');

    t.unique(['product_id', 'plugin_id']);

    t.timestamps(true, true);
  });
}

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
