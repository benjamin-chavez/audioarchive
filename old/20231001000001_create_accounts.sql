-- database/migrations/20231001000001_create_accounts.sql
CREATE TABLE accounts(
    id serial PRIMARY KEY
    , appUserId integer NOT NULL REFERENCES app_users(id) ON DELETE CASCADE
    , stripeAccountId text NOT NULL UNIQUE
    , chargesEnabled boolean DEFAULT FALSE
    , payoutsEnabled boolean DEFAULT FALSE
    , detailsSubmitted boolean DEFAULT FALSE
    , defaultAccount boolean DEFAULT TRUE
    , created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_accounts_appUserId ON accounts(appUserId);

CREATE INDEX idx_accounts_defaultAccount ON accounts(defaultAccount);

-- DROP TABLE IF EXISTS accounts;
