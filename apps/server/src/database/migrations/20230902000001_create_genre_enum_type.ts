// import { GENRE_ENUM_VALUES } from '@shared/src/constants';
import { Knex } from 'knex';

const ENUM_NAME = 'genre';
export const GENRE_ENUM_VALUES = [
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

const enumValues = GENRE_ENUM_VALUES.map((value) => `'${value}'`).join(', ');
// const enumValues = [
//   'Bass House',
//   'Breakbeat',
//   'Breaks',
//   'Deep House',
//   'UK Bass',
//   'dubstep',
//   'House',
//   'Pop',
//   'Techno',
//   'Trap',
// ];

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TYPE ${ENUM_NAME};
  `);
}
