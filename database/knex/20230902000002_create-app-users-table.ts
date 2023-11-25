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

// CREATE TABLE app_users (
//     id SERIAL PRIMARY KEY,
//     authId VARCHAR(255) UNIQUE NOT NULL,
//     firstName VARCHAR(255) NOT NULL,
//     lastName VARCHAR(255) NOT NULL,
//     username VARCHAR(255) UNIQUE,
//     email VARCHAR(255) UNIQUE,
//     -- Uncomment the following lines if you want these fields in your table
//     -- avatar VARCHAR(255) DEFAULT 'default-avatar-seed.jpg',
//     -- avatarS3Key VARCHAR(512) DEFAULT 'default-avatar-seed.webp',
//     -- avatarS3Url VARCHAR(512),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE app_users (
//     id SERIAL PRIMARY KEY,
//     authId VARCHAR(255) UNIQUE NOT NULL,
//     firstName VARCHAR(255) NOT NULL,
//     lastName VARCHAR(255) NOT NULL,
//     username VARCHAR(255) UNIQUE,
//     email VARCHAR(255) UNIQUE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// DROP TABLE IF EXISTS app_users;

// CREATE TABLE app_users (
//     id SERIAL PRIMARY KEY,
//     authId VARCHAR(255) UNIQUE NOT NULL,
//     firstName VARCHAR(255) NOT NULL,
//     lastName VARCHAR(255) NOT NULL,
//     username VARCHAR(255) UNIQUE,
//     email VARCHAR(255) UNIQUE,
//     Uncomment the following lines if you want these fields in your table
//     avatar VARCHAR(255) DEFAULT 'default-avatar-seed.jpg',
//     avatarS3Key VARCHAR(512) DEFAULT 'default-avatar-seed.webp',
//     avatarS3Url VARCHAR(512),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
