-- database/migrations/20230902000002_create-app-users-table.sql
CREATE TABLE app_users(
    id serial PRIMARY KEY
    , auth_id varchar(255) UNIQUE NOT NULL
    , first_name varchar(255) NOT NULL
    , last_name varchar(255) NOT NULL
    , username varchar(255) UNIQUE
    , email varchar(255) UNIQUE
    , avatar varchar(255) DEFAULT 'default-avatar-seed.jpg'
    , avatar_s3_key varchar(512) DEFAULT 'default-avatar-seed.webp'
    , avatar_s3_url varchar(512)
    , created_at timestamp DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);
