// apps/server/src/database/knex/20230902000002_create-app-users-table.js

/**
 * @typedef {import('knex')} Knex
 */

const TABLE_NAME = 'app_users';

/**
 * Create the 'app_users' table.
 *
 * @param {Knex} knex - The Knex connection object.
 * @returns {Promise<void>}
 */
exports.up = function (knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('authId').unique().notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('username').unique();
    table.string('email').unique();
    // Uncomment the following line if you want this field in your table
    // table.string('avatar').defaultTo('default-avatar-seed.jpg');
    table.string('avatarS3Key', 512).defaultTo('default-avatar-seed.webp');
    table.string('avatarS3Url', 512);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * Drop the 'app_users' table if it exists.
 *
 * @param {Knex} knex - The Knex connection object.
 * @returns {Promise<void>}
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
