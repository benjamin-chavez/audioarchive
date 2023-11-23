# database/migrations/Dockerfile

FROM redgate/flyway

COPY ./database/migrations /flyway/database/migrations

# Environment variables for database connection
# These can be passed at runtime
ENV FLYWAY_URL=
ENV FLYWAY_USER=
ENV FLYWAY_PASSWORD=

# Flyway command (can be overridden)
CMD ["flyway", "migrate"]
