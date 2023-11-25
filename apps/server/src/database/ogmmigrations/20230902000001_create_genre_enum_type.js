// apps/server/src/database/knex/20230902000001_create_genre_enum_type.js

/**
 * @typedef {import('knex')} Knex
 */

// const GENRE_ENUM_VALUES = require('@shared/src/constants').GENRE_ENUM_VALUES; // Adjust the path as necessary

const ENUM_NAME = 'genre';

const enumValues = [
  'Bass House',
  'Breakbeat',
  'Breaks',
  'Deep House',
  'UK Bass',
  'dubstep',
  'House',
  'Pop',
  'Techno',
  'Trap',
];

/**
 * Run the migration, creating the genre enum type.
 *
 * @param {Knex} knex - The Knex connection object.
 * @returns {Promise<void>}
 */
async function up(knex) {
  const enumValuesString = enumValues.map((value) => `'${value}'`).join(', ');
  await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValuesString})`);
}

/**
 * Reverse the migration, dropping the genre enum type.
 *
 * @param {Knex} knex - The Knex connection object.
 * @returns {Promise<void>}
 */
async function down(knex) {
  await knex.raw(`
    DROP TYPE ${ENUM_NAME};
  `);
}

module.exports = { up, down };
