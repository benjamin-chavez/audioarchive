-- database/migrations/20230902000002_create-app-users-table.sql
CREATE TABLE app_users(
    id serial PRIMARY KEY
    , authId varchar(255) UNIQUE NOT NULL
    , firstName varchar(255) NOT NULL
    , lastName varchar(255) NOT NULL
    , username varchar(255) UNIQUE
    , email varchar(255) UNIQUE
    , avatar varchar(255) DEFAULT 'default-avatar-seed.jpg'
    , avatarS3Key varchar(512) DEFAULT 'default-avatar-seed.webp'
    , avatarS3Url varchar(512)
    , created_at timestamp DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);
