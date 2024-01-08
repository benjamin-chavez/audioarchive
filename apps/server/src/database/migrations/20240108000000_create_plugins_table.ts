import { Knex } from 'knex';

const TABLE_NAME = 'plugins';

exports.up = async function (knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, async (t) => {
    t.increments('id').primary();
    // TODO: Should company be `.notNullable()`?
    t.string('name').notNullable();
    t.string('company');
    // TODO: Should version be `.notNullable()`?
    t.string('version');
    t.integer('daw_id').unsigned().references('id').inTable('daws');
    t.string('product_url');
    t.timestamps(true, true);

    t.unique(['name', 'company', 'version']);
    t.index('name');
    t.index('company');
    t.index('version');
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
