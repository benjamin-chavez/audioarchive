# infrastructure/scripts/kill-all-db-connections.sh
# TODO: Can probably delete this file and keep the sql version instead
#!/bin/bash

# Define your database credentials
DB_USER="postgres"
DB_HOST=""
DB_PORT="5432"

# SQL commands
SQL_COMMANDS="
SELECT
    pg_terminate_backend(pg_stat_activity.pid)
FROM
    pg_stat_activity
WHERE
    pg_stat_activity.datname = 'audio_archive_production'
    AND pid <> pg_backend_pid();

DROP DATABASE audio_archive_production;
"

# Execute the SQL commands
psql -h $DB_HOST -U $DB_USER -p $DB_PORT -c "$SQL_COMMANDS"

echo "Database operations completed."
