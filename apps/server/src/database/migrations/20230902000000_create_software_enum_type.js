// apps/server/src/database/migrations/20230902000000_create_software_enum_type.ts

// import { Knex } from 'knex';
// import { SOFTWARE_ENUM_VALUES } from '@shared';

const ENUM_NAME = 'software';

const enumValues = "'Ableton', 'FL_Studio', 'Logic'";

module.exports.up = async function up(knex) {
  await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
};

module.exports.down = async function down(knex) {
  await knex.raw(`DROP TYPE ${ENUM_NAME};`);
};
