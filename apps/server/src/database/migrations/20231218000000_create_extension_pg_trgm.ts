// apps/server/src/database/migrations/20231218000000_create_extension_pg_trgm.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
  `);
}

// SELECT * FROM app_users
// WHERE display_name % 'ami lake' OR username % 'ami lake';
export async function down(knex: Knex): Promise<void> {}

// export async function up(knex: Knex): Promise<void> {
//   await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
// }
