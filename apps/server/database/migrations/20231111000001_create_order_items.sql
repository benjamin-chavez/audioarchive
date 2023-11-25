CREATE TABLE order_items(
    id serial PRIMARY KEY
    , order_id integer NOT NULL REFERENCES orders(id) ON DELETE CASCADE
    , product_id integer NOT NULL REFERENCES products(id)
    , created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- DROP TABLE IF EXISTS order_items;
