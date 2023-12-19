// apps/server/src/database/migrations/20231218000000_create_text_search_vectors.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
  ALTER TABLE app_users ADD search tsvector GENERATED ALWAYS AS (
    to_tsvector('english', display_name) || ' ' ||
    to_tsvector('english', username)
) STORED;

CREATE INDEX idx_search ON app_users USING GIN(search);

--////--------------------------------------------------------

ALTER TABLE app_users ADD COLUMN search2 tsvector GENERATED ALWAYS AS (to_tsvector('english', display_name || ' ' || username)) STORED;


CREATE INDEX idx_search2 ON app_users USING GIN(search2);

--////--------------------------------------------------------

--////CREATE EXTENSION fuzzystrmatch;

--////CREATE MATERIALIZED VIEW unique_lexeme AS
   --////SELECT word FROM ts_stat('SELECT search FROM app_users');

--////CREATE MATERIALIZED VIEW unique_lexeme2 AS
   --////SELECT word FROM ts_stat('SELECT search2 FROM app_users');
  `);
}

// CREATE INDEX idx_search ON app_users USING GIN(search);
//   ALTER TABLE app_users ADD COLUMN ts tsvector GENERATED ALWAYS AS (to_tsvector('english', display_name || ' ' || username)) STORED;

//   // CREATE INDEX ts_idx ON app_users USING GIN (ts);
//   await knex.schema.raw(`
// CREATE EXTENSION IF NOT EXISTS pg_trgm;

// CREATE INDEX trgm_idx_display_name ON app_users USING GIN (display_name gin_trgm_ops);
// CREATE INDEX trgm_idx_username ON app_users USING GIN (username gin_trgm_ops);

export async function down(knex: Knex): Promise<void> {}

// export async function up(knex: Knex): Promise<void> {
//   await knex.raw(`CREATE TYPE ${ENUM_NAME} AS ENUM(${enumValues})`);
// }
