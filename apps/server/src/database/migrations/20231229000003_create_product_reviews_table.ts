// apps/server/src/database/migrations/20231229000003_create_product_reviews_table.ts

import { Knex } from 'knex';

// TODO: CONSIDER ADDING THE REVIEW TITLE AND OR REVIEW COMMENTS TO THE FULL TEXT SEARCH

const TABLE_NAME = 'product_reviews';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments('id').primary();
    t.string('title');
    t.string('comment');

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
    t.index(['created_at']);
    //  t.specificType('comment_fts', 'tsvector');
  });

  // await knex.raw(`
  //   CREATE TRIGGER tsvector_update BEFORE INSERT OR UPDATE
  //   ON ${TABLE_NAME} FOR EACH ROW EXECUTE FUNCTION
  //   tsvector_update_trigger(comment_fts, 'pg_catalog.english', comment);
  // `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
