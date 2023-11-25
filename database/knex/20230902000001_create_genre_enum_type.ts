import { GENRE_ENUM_VALUES } from '@shared/src/constants';
import { Knex } from 'knex';

const ENUM_NAME = 'genre';

const enumValues = GENRE_ENUM_VALUES.map((value) => `'${value}'`).join(', ');

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TYPE ${ENUM_NAME};
  `);
}
