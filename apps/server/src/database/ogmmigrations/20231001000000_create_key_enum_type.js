// apps/server/src/database/knex/20231001000000_create_key_enum_type.js

/**
 * @typedef {import('knex')} Knex
 */

const ENUM_NAME = 'key';

// Directly defining the STANDARD_ENUM_VALUES

const CAMELOT_ENUM_VALUES = [
  '1B',
  '2B',
  '3B',
  '4B',
  '5B',
  '6B',
  '7B',
  '8B',
  '9B',
  '10B',
  '11B',
  '12B',
  '1A',
  '2A',
  '3A',
  '4A',
  '5A',
  '6A',
  '7A',
  '8A',
  '9A',
  '10A',
  '11A',
  '12A',
];

const STANDARD_ENUM_VALUES = [
  'B Major',
  'F♯/G♭ Major',
  'D♭ Major',
  'A♭ Major',
  'E♭ Major',
  'B♭ Major',
  'F Major',
  'C Major',
  'G Major',
  'D Major',
  'A Major',
  'E Major',
  'A♭ Minor',
  'E♭ Minor',
  'B♭ Minor',
  'F Minor',
  'C Minor',
  'G Minor',
  'D Minor',
  'A Minor',
  'E Minor',
  'B Minor',
  'F♯/G♭ Minor',
  'D♭ Minor',
];

const KEY_ENUM_VALUES = STANDARD_ENUM_VALUES;

const enumValues = KEY_ENUM_VALUES.map((value) => `'${value}'`).join(', ');

/**
 * Run the migration, creating the key enum type.
 *
 * @param {Knex} knex - The Knex connection object.
 * @returns {Promise<void>}
 */
exports.up = async function (knex) {
  await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
};

/**
 * Reverse the migration, dropping the key enum type.
 *
 * @param {Knex} knex - The Knex connection object.
 * @returns {Promise<void>}
 */
exports.down = async function (knex) {
  await knex.raw(`
    DROP TYPE ${ENUM_NAME};
  `);
};
