import { Knex } from 'knex';

const TABLE_NAME = 'plugins';

// TODO: ADD somesort of submission process for new plugins to be added.
// TODO: This could also be automated based on number of products containing the plugin, which could be checked nightly or something

exports.up = async function (knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, async (t) => {
    t.increments('id').primary();
    // TODO: Should company be `.notNullable()`?
    t.string('plugin_name').notNullable();
    t.string('manufacturer');
    // TODO: Should version be `.notNullable()`?
    t.string('plugin_version');
    t.integer('daw_id').unsigned().references('id').inTable('daws');

    // TODO: add plugin category?
    // TODO: add Windows/Mac?

    t.string('plugin_product_url');
    t.boolean('is_approved').defaultTo(false).notNullable;

    t.timestamps(true, true);

    t.unique(['plugin_name', 'manufacturer', 'plugin_version']);
    t.index('plugin_name');
    t.index('manufacturer');
    t.index('plugin_version');
    t.index('is_approved');
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
