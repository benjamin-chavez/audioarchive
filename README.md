# audioarchive

### Apps and Packages

- `client`: a [Next.js](https://nextjs.org/) app
- `server`: an [Express](https://expressjs.com/) server
- `ui`: ui: a React component library
- `eslint-config-custom`: `eslint` configurations for client side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `eslint-config-custom-server`: `eslint` configurations for server side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `scripts`: Jest configurations
- `logger`: Isomorphic logger (a small wrapper around console.log)
- `tsconfig`: tsconfig.json;s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Docker

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start dev
docker-compose -f docker-compose.yml up

# OR Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open Client: http://localhost:3000.
Open Server: http://localhost:5000.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Remote Caching

This example includes optional remote caching. In the Dockerfiles of the apps, uncomment the build arguments for `TURBO_TEAM` and `TURBO_TOKEN`. Then, pass these build arguments to your Docker build.

You can test this behavior using a command like:

`docker build -f apps/web/Dockerfile . --build-arg TURBO_TEAM=“your-team-name” --build-arg TURBO_TOKEN=“your-token“ --no-cache`

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

### Notes
- User signup in local dev requires that the webhook route is publicly accesable. You can use ngrok for this.


### TODOs
-auto-approve

- https://stackoverflow.com/questions/76899023/rds-while-connection-error-no-pg-hba-conf-entry-for-host
fully-working-ecs/FINAL WITH ALL ROUTING/express-api/knexfile.ts


<!-- TODO: -->
 - REVIEW TO SEE IF YOU ACTUALLY NEED THESE PACKAGES:
    ```json
    "dependencies": {
      ...
      "debug": "~4.3.4",
      "cookie-parser": "~1.4.6",
      "kysely-codegen": "^0.10.1",
      "pg-to-ts": "^4.1.1",
      "connect-session-knex": "^3.0.1",
      "express-flash": "^0.0.2",
      "express-jwt": "^8.4.1",
      "express-oauth2-jwt-bearer": "^1.5.0",
      "express-openid-connect": "^2.16.0",
      "express-session": "^1.17.3",
      "helmet": "^7.0.0",
      "jwks-rsa": "^3.0.1",
      "pg": "^8.11.3"
    },
    "devDependencies": {
      ...
      "@types/express-flash": "^0.0.2",
      "@aws-sdk/types": "^3.425.0",
      "@types/cookie-parser": "^1.4.3",
      "@types/express-session": "^1.17.7",
      "@types/pg": "^8.10.2",
      "ts-jest": "^29.1.1",
      "ts-node": "^10.9.1"
    }
  ```
