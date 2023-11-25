// apps/server/src/database/migrations/20230902000000_create_software_enum_type.js

/**
 * @typedef {import('knex')} Knex
 */

// const SOFTWARE_ENUM_VALUES = require('@shared').SOFTWARE_ENUM_VALUES; // Assuming @shared exports SOFTWARE_ENUM_VALUES
// const enumValues = "'Ableton', 'FL_Studio', 'Logic'";

const ENUM_NAME = 'software';

// const enumValues = SOFTWARE_ENUM_VALUES.map((value) => `'${value}'`).join(', ');
const enumValues = "'Ableton', 'FL_Studio', 'Logic'";

/**
 * Run the migration, creating the software enum type.
 *
 * @param {Knex} knex - The Knex connection object.
 * @returns {Promise<void>}
 */
async function up(knex) {
  await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
}

/**
 * Reverse the migration, dropping the software enum type.
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
