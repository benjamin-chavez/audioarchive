// apps/server/src/database/migrations/20230902000000_create_software_enum_type.ts

import { Knex } from 'knex';

const TABLE_NAME = 'daws';
const DAW_VALUES = ['Ableton', 'FL_Studio', 'Logic', 'Bitwig'];

exports.up = async function (knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, async (t) => {
    t.increments('id').primary();
    t.string('name').unique().notNullable();

    t.index('name');

    const dawRows = DAW_VALUES.map((name) => ({ name }));
    await knex(TABLE_NAME).insert(dawRows);
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};

// ENUM VERSION:
// // apps/server/src/database/migrations/20230902000000_create_software_enum_type.ts

// import { Knex } from 'knex';
// // import { SOFTWARE_ENUM_VALUES } from '@shared';
// const SOFTWARE_ENUM_VALUES = ['Ableton', 'FL_Studio', 'Logic', 'Bitwig'];

// const ENUM_NAME = 'software';

// const enumValues = SOFTWARE_ENUM_VALUES.map((value) => `'${value}'`).join(', ');

// export async function up(knex: Knex): Promise<void> {
//   await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
// }

// export async function down(knex: Knex): Promise<void> {
//   await knex.raw(`
//     DROP TYPE ${ENUM_NAME};
//   `);
// }
