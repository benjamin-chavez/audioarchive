import { Knex } from 'knex';

const TABLE_NAME = 'products';

exports.up = async function (knex: Knex): Promise<void> {
  // await knex.schema.raw(
  //   "CREATE TYPE productStatusType AS ENUM ('draft', 'published', 'archived')"
  // );

  return knex.schema.createTable(TABLE_NAME, (t) => {
    // Primary Key
    t.increments('id').primary();

    // Foreign Key
    t.integer('appUserId')
      .unsigned()
      .references('appUsers.id')
      .notNullable()
      .onDelete('CASCADE');

    t.integer('accountId')
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
    t.string('key'); // Optional column for a unique key or identifier
    t.string('label'); // Optional column for a display label
    t.text('description'); // Optional column for a longer description. Using 'text' type for potentially longer content.

    t.string('stripeProductId');

    // Metadata Columns
    t.timestamps(true, true);

    // Composite Unique Constraint
    t.unique(['appUserId', 'name']);

    t.index('stripeProductId');
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};

//     // t.enu('column', ['dubstep', 'house', 'pop', 'trap'], {
//   useNative: true,
//   enumName: 'genre',
// });
