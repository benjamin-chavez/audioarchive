-- infrastructure/scripts/kill-all-db-connections.sql
SELECT
    pg_terminate_backend(pg_stat_activity.pid)
FROM
    pg_stat_activity
WHERE
    pg_stat_activity.datname = 'audio_archive_production'
    AND pid <> pg_backend_pid();

DROP DATABASE audio_archive_production;
