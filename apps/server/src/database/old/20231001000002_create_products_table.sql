-- database/migrations/20231001000002_create_products_table.sql
CREATE TABLE products(
    id serial PRIMARY KEY
    , app_user_id integer NOT NULL REFERENCES app_users(id) ON DELETE CASCADE
    , account_id integer NOT NULL REFERENCES accounts(id) ON DELETE CASCADE
    , NAME text NOT NULL
    , genre genre NOT NULL
    , software software NOT NULL
    , bpm integer NOT NULL CHECK (bpm BETWEEN 20 AND 999)
    , price numeric NOT NULL CHECK (price > 0)
    , img_s3_key text DEFAULT 'default-album-artwork-seed.webp'
    , img_s3_url text
    , digital_file_s3_key text DEFAULT 'ableton-audio-archive-demo-file-project-seed.zip'
    , digital_file_s3_url text
    , KEY TEXT
    , LABEL text
    , description text
    , stripe_product_id text
    , created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , UNIQUE (app_user_id , name)
);

CREATE INDEX idx_products_stripe_product_id ON products(stripe_product_id);

-- DROP TABLE IF EXISTS products;
