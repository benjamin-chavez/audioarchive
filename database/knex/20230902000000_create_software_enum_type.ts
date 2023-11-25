// apps/server/src/database/migrations/20230902000000_create_software_enum_type.ts

import { Knex } from 'knex';
import { SOFTWARE_ENUM_VALUES } from '@shared';

const ENUM_NAME = 'software';

const enumValues = SOFTWARE_ENUM_VALUES.map((value) => `'${value}'`).join(', ');

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TYPE ${ENUM_NAME};
  `);
}
