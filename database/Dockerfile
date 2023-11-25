# database/Dockerfile

FROM redgate/flyway

WORKDIR /flyway

# COPY ./database/migrations /flyway/database/migrations
COPY db/flyway.conf /flyway/conf

# Environment variables for database connection
# These can be passed at runtime
# ENV FLYWAY_URL=
# ENV FLYWAY_USER=
# ENV FLYWAY_PASSWORD=

# Flyway command (can be overridden)
CMD ["flyway", "migrate"]
