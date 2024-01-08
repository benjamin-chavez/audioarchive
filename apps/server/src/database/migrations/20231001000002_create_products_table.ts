import { Knex } from 'knex';

const TABLE_NAME = 'products';

exports.up = async function (knex: Knex): Promise<void> {
  await knex.schema.raw(
    "CREATE TYPE product_status_type AS ENUM ('draft', 'published', 'archived')"
  );

  return knex.schema.createTable(TABLE_NAME, (t) => {
    // Primary Key
    t.increments('id').primary();

    // Foreign Key
    t.integer('app_user_id')
      .unsigned()
      .references('id')
      .inTable('app_users')
      .notNullable()
      .onDelete('CASCADE');

    t.integer('account_id')
      .unsigned()
      .references('id')
      .inTable('accounts')
      .notNullable()
      .onDelete('RESTRICT');

    // Foreign Key
    // t.integer('genreName')
    //   .unsigned()
    //   .references('name')
    //   .inTable('genre')
    //   .notNullable()
    //   .onDelete('CASCADE');

    t.integer('genre_id')
      .unsigned()
      .references('id')
      .inTable('genre')
      .onDelete('SET NULL');

    t.string('genre_name')
      .references('name')
      .inTable('genre')
      .onDelete('SET NULL');

    // Essential Columns
    t.string('name').notNullable();
    // t.specificType('genre', 'genre').notNullable();
    t.string('daw').notNullable();
    t.float('bpm')
      .unsigned()
      .notNullable()
      .checkBetween([[20, 999]]);
    t.decimal('price').checkPositive().unsigned().notNullable(); // <= // [precision, scale]

    t.specificType('status', 'product_status_type')
      .notNullable()
      .defaultTo('draft');

    t.string('img_s3_key', 512).defaultTo('default-album-artwork-seed.webp');
    t.string('img_s3_url', 512);

    t.string('digital_file_s3_key', 512).defaultTo(
      'ableton-audio-archive-demo-file-project-seed.zip'
    );
    t.string('digital_file_s3_url', 512);

    // New Optional Columns
    t.string('key');
    t.string('label');
    t.text('description');
    t.boolean('is_featured').defaultTo(false).notNullable;

    t.string('stripe_product_id');

    t.timestamps(true, true);

    // Composite Unique Constraint
    t.unique(['app_user_id', 'name']);
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
