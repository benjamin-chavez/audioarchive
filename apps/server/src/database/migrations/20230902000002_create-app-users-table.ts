import { Knex } from 'knex';

const TABLE_NAME = 'app_users';

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('authId').unique().notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('username').unique();
    table.string('email').unique();
    // table.string('avatar').defaultTo('default-avatar-seed.jpg');
    table.string('avatarS3Key', 512).defaultTo('default-avatar-seed.webp');
    table.string('avatarS3Url', 512);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
