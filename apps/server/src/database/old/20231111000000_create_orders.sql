CREATE TABLE orders(
    id serial PRIMARY KEY
    , app_user_id integer NOT NULL REFERENCES app_users(id)
    , stripe_payment_intent_id text
    , payment_status text NOT NULL DEFAULT 'pending'
    , stripe_checkout_session_id text
    , created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_id ON orders(id);

CREATE INDEX idx_orders_stripe_payment_intent_id ON orders(stripe_payment_intent_id);

CREATE INDEX idx_orders_stripe_checkout_session_id ON orders(stripe_checkout_session_id);

-- DROP TABLE IF EXISTS orders;
