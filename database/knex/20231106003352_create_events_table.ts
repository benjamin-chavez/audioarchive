import { Knex } from 'knex';

const TABLE_NAME = 'events';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(
    "CREATE TYPE eventStatusType AS ENUM ('pending', 'processing', 'processed', 'failed')"
    // "CREATE TYPE eventStatusType AS ENUM (\'pending\', \'processing\', \'processed\', \'failed\')"
  );

  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.json('data');
    table.string('source');
    table.string('type');
    table.text('processing_errors');
    table.specificType('status', 'eventStatusType').notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
