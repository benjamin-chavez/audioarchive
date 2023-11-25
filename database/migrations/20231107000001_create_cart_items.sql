CREATE TABLE cart_items(
    id serial PRIMARY KEY
    , cart_id integer NOT NULL REFERENCES carts(id) ON DELETE CASCADE
    , product_id integer NOT NULL REFERENCES products(id)
    , created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- DROP TABLE IF EXISTS cart_items;
