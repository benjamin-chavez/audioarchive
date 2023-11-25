CREATE TABLE cart_items(
    id serial PRIMARY KEY
    , cartId integer NOT NULL REFERENCES carts(id) ON DELETE CASCADE
    , productId integer NOT NULL REFERENCES products(id)
    , created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- DROP TABLE IF EXISTS cart_items;
