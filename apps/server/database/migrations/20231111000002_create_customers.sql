CREATE TABLE customers(
    id serial PRIMARY KEY
    , app_user_id integer NOT NULL REFERENCES app_users(id)
    , stripe_customer_id text UNIQUE
    , created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customers_stripe_customer_id ON customers(stripe_customer_id);

-- DROP TABLE IF EXISTS customers;
