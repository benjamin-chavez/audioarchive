-- database/migrations/20231106003352_create_events_table.sql
CREATE TYPE eventStatusType AS ENUM(
    'pending'
    , 'processing'
    , 'processed'
    , 'failed'
);

CREATE TABLE events(
    id serial PRIMARY KEY
    , data json
    , source text
    , type text
    , processing_errors text
    , status eventStatusType NOT NULL
    , created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    , updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- -- Dropping the events table
-- DROP TABLE IF EXISTS events;
-- -- Dropping the enum type for event status
-- DROP TYPE IF EXISTS eventStatusType;
