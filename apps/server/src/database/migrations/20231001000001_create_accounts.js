// apps/server/src/database/knex/20231001000001_create_accounts.js

/**
 * @typedef {import('knex')} Knex
 */

const TABLE_NAME = 'accounts';

/**
 * Create the 'accounts' table.
 *
 * @param {Knex} knex - The Knex connection object.
 * @returns {Promise<void>}
 */
exports.up = async function (knex) {
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
};

/**
 * Drop the 'accounts' table if it exists.
 *
 * @param {Knex} knex - The Knex connection object.
 * @returns {Promise<void>}
 */
exports.down = async function (knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
