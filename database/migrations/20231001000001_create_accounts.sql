-- database/migrations/20231001000001_create_accounts.sql
CREATE TABLE accounts(
    id serial PRIMARY KEY
    , app_user_id integer NOT NULL REFERENCES app_users(id) ON DELETE CASCADE
    , stripe_account_id text NOT NULL UNIQUE
    , charges_enabled boolean DEFAULT FALSE
    , payouts_enabled boolean DEFAULT FALSE
    , details_submitted boolean DEFAULT FALSE
    , default_account boolean DEFAULT TRUE
    , created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_accounts_appUserId ON accounts(app_user_id);

CREATE INDEX idx_accounts_default_account ON accounts(default_account);

-- DROP TABLE IF EXISTS accounts;
