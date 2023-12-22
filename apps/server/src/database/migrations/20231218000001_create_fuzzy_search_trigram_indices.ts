// apps/server/src/database/migrations/20231218000001_create_fuzzy_search_trigram_indices.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    -- Indices on app_users table
    CREATE INDEX idx_display_name_trgm ON app_users USING gin (display_name gin_trgm_ops);
    CREATE INDEX idx_username_trgm ON app_users USING gin (username gin_trgm_ops);

    -- Indices on products table
    CREATE INDEX idx_genre_name_trgm ON products USING gin (genre_name gin_trgm_ops);
    CREATE INDEX idx_name_trgm ON products USING gin (name gin_trgm_ops);
    CREATE INDEX idx_daw_trgm ON products USING gin (daw gin_trgm_ops);
    --CREATE INDEX idx_bpm_trgm ON products USING gin (bpm gin_trgm_ops);
    CREATE INDEX idx_description_trgm ON products USING gin (description gin_trgm_ops);
  `);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
  -- Drop indices on app_users table
  DROP INDEX IF EXISTS idx_display_name_trgm;
  DROP INDEX IF EXISTS idx_username_trgm;

  -- Drop indices on products table
  DROP INDEX IF EXISTS idx_genre_name_trgm;
  DROP INDEX IF EXISTS idx_name_trgm;
  DROP INDEX IF EXISTS idx_daw_trgm;
  --DROP INDEX IF EXISTS idx_bpm_trgm;
  DROP INDEX IF EXISTS idx_description_trgm;
`);
}
