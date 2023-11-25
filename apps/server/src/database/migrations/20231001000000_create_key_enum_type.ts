import { Knex } from 'knex';
// import { STANDARD_ENUM_VALUES } from '@shared/src/constants';

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

const ENUM_NAME = 'key';
const KEY_ENUM_VALUES = STANDARD_ENUM_VALUES;

const enumValues = KEY_ENUM_VALUES.map((value) => `'${value}'`).join(', ');

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TYPE ${ENUM_NAME};
  `);
}
