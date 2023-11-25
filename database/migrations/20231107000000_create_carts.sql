-- Creating the enum type for cart status
CREATE TYPE cart_status_type AS ENUM(
    'active'
    , 'purchased'
    , 'archived'
    , 'abandoned'
);

-- Creating the carts table
CREATE TABLE carts(
    id serial PRIMARY KEY
    , app_user_id integer NOT NULL REFERENCES app_users(id) ON DELETE CASCADE
    , status cart_status_type NOT NULL DEFAULT 'active'
    , created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_carts_id ON carts(id);

-- Creating a unique index for active carts
CREATE UNIQUE INDEX idx_unique_active_cart ON carts(app_user_id)
WHERE
    status = 'active';

-- -- Dropping the carts table
-- DROP TABLE IF EXISTS carts;
-- -- Dropping the enum type for cart status
-- DROP TYPE IF EXISTS cart_status_type;
