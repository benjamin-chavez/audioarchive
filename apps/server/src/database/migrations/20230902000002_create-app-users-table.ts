import { Knex } from 'knex';

const TABLE_NAME = 'app_users';

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments('id').primary();
    t.string('auth_id').unique().notNullable();
    t.string('display_name').notNullable();
    t.string('first_name').notNullable();
    t.string('last_name').notNullable();
    t.string('username').unique();
    t.string('email').unique();
    // t.string('avatar').defaultTo('default-avatar-seed.jpg');
    t.string('avatar_s3_key', 512).defaultTo('default-avatar-seed.webp');
    t.string('avatar_s3_url', 512);
    t.string('spotify_id');

    t.string('spotify_url');
    t.string('instagram_url');
    t.string('facebook_url');
    t.string('soundcloud_url');
    t.string('apple_music_url');
    t.string('tik_tok_url');
    t.string('youtube_url');
    // t.timestamp('created_at').defaultTo(knex.fn.now());
    // t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.timestamps(true, true);
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
