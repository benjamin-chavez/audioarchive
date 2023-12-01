import { Knex } from 'knex';

const TABLE_NAME = 'products';

exports.up = async function (knex: Knex): Promise<void> {
  // await knex.schema.raw(
  //   "CREATE TYPE productStatusType AS ENUM ('draft', 'published', 'archived')"
  // );
  // await createOnUpdateTimestampFunction(knex);

  return knex.schema.createTable(TABLE_NAME, (t) => {
    // Primary Key
    t.increments('id').primary();

    // Foreign Key
    t.integer('appUserId')
      .unsigned()
      .references('appUsers.id')
      .notNullable()
      .onDelete('CASCADE');

    t.integer('account_id')
      .unsigned()
      .references('id')
      .inTable('accounts')
      .notNullable()
      .onDelete('CASCADE');

    // Essential Columns
    t.string('name').notNullable();
    t.specificType('genre', 'genre').notNullable();
    t.specificType('software', 'software').notNullable();
    t.integer('bpm')
      .unsigned()
      .notNullable()
      .checkBetween([[20, 999]]);
    t.decimal('price').checkPositive().unsigned().notNullable(); // <= // [precision, scale]

    // t.specificType('status', 'productStatusType')
    //   .notNullable()
    //   .defaultTo('draft');

    t.string('imgS3Key', 512).defaultTo('default-album-artwork-seed.webp');
    t.string('imgS3Url', 512);

    t.string('digitalFileS3Key', 512).defaultTo(
      'ableton-audio-archive-demo-file-project-seed.zip'
    );
    t.string('digitalFileS3Url', 512);

    // New Optional Columns
    t.string('key');
    t.string('label');
    t.text('description');

    t.string('stripeProductId');

    t.timestamps(true, true);
    // t.timestamp('created_at').defaultTo(knex.fn.now());
    // t.timestamp('updated_at').defaultTo(knex.fn.now());

    // Composite Unique Constraint
    t.unique(['appUserId', 'name']);

    // t.index('stripeProductId');
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
