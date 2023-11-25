// import { GENRE_ENUM_VALUES } from '@shared/src/constants';
// import { Knex } from 'knex';

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

exports.up = async function (knex) {
  const enumValuesString = enumValues.map((value) => `'${value}'`).join(', ');
  await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValuesString})`);
};

exports.down = async function (knex) {
  await knex.raw(`
    DROP TYPE ${ENUM_NAME};
  `);
};
