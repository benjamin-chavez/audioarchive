import { Knex } from 'knex';

const TABLE_NAME = 'genre';
export const GENRE_VALUES = [
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

exports.up = async function (knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, async (t) => {
    t.increments('id').primary();
    t.string('name').unique().notNullable();

    t.index('name');

    const dawRows = GENRE_VALUES.map((name) => ({ name }));
    await knex(TABLE_NAME).insert(dawRows);
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};

// ENUM VERSION
// import { Knex } from 'knex';
// // import { GENRE_ENUM_VALUES } from '@shared/src/constants';

// export const GENRE_ENUM_VALUES = [
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

// const ENUM_NAME = 'genre';

// const enumValues = GENRE_ENUM_VALUES.map((value) => `'${value}'`).join(', ');

// export async function up(knex: Knex): Promise<void> {
//   await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
// }

// export async function down(knex: Knex): Promise<void> {
//   await knex.raw(`
//     DROP TYPE ${ENUM_NAME};
//   `);
// }
