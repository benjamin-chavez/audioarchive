// apps/server/src/database/migrations/20230902000000_create_timestamp_functions.ts

import { Knex } from 'knex';

const ON_UPDATE_TIMESTAMP_FUNCTION = `
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
$$ language 'plpgsql';
`;

const DROP_ON_UPDATE_TIMESTAMP_FUNCTION = `DROP FUNCTION on_update_timestamp`;

exports.up = (knex: Knex) => knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
exports.down = (knex: Knex) => knex.raw(DROP_ON_UPDATE_TIMESTAMP_FUNCTION);
