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


### TODO
-auto-approve

https://stackoverflow.com/questions/76899023/rds-while-connection-error-no-pg-hba-conf-entry-for-host
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
 - https://alto9.com/2020/05/21/aws-ssm-parameters-as-ecs-environment-variables/
https://www.google.com/search?q=aws+ecs+fargate+ssm+parameter+store&oq=aws+ecs+fargate+ssm+parameter+store&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTE3NDQxajBqNKgCALACAA&sourceid=chrome&ie=UTF-8#ip=1
 - Go through all IAM and narrow permissions
 <!--// - Set up RabbitMQ on AWS: -->
    <!--// - https://www.npmjs.com/package/@aws-sdk/client-mq -->
    <!--// - https://dev.to/aws-builders/simple-event-driven-app-using-amazon-mq-rabbitmq-22b0 -->
 - Search
    - Setup
    - Filtering of products based on various categories

 - Database:
    - Setup automigration in the CI/CD Pipeline
    - Write updated seed data/functions
        - Must get updated Stripe data
        - Must have significantly higher volume
    - Restructure Product table and convert Enums to other type
    - Add published/draft logic to products table
    - convert the `/api/app-users/register` route to a webhook route. Something like `/api/webhooks/auth0/register`.

 - Cart:
    - Set up logic to store cart in local storage/context if not logged in
    - Fix formatting
        - order toal `$NAN`
        - all numbers should only have two decimal places. Currently showing this: `$899.7000000000002`
    - update with tax info
    - Add to cart toast notification
    - Cart items count icon
    - Cart Dropdown menu
    - Update so that you cannot have duplicate items in the cart - should increase quantity instead
    - Redirect to Login Not setup - you probably won't need this once you set up local storage

 - Payments
    - Look into adding a second payment provider
    - Post question on stripe reddit about best practices for digital product marketplaces
    - set up tax logic
    - finish setting up/review payout logic
    - review if you need to avoid selling in certain regions
    - Add the subscription model for sellers who want to sell above a certain quota of disk space\
    - Completed purchase redirect should go to a confirm page or go to the dashboard download page

 - Admin Dashboard:
    - The navbar option for this should only be visible to Admin users

 - Seller Dashboard:
    - Fix the product update logic so that the project file is name is loaded and so that a file isn't required to update the products
    - Reorganize the `My Accounts` section.
    - Add screen to display all orders

 - Product
    - Show Page
        - Should pull all data from actual product
        - Remove the Download Button unless user already purchased product
        - Add `Edit` button if user is the product Seller
    - Index Page
        - Stream in data


 - User Dashboard
    - Add screen to display all purchases/downloads

 - Infrastructure
    - Set up Cloudfront
        - Try to get images to load in less choppy
        - the cached images on the product show page should be the same as the products index page?
    - Look into adding `serverless framework` and splitting iac between terraform and serverless
    - Review and narrow all Iam roles/policies
    - Fix bug that breaks the CI/CD when you run a second `pnpm tfa` command

 - Auth
    - Migrate to Cognito?
    - Login Redirect screen - Currently takes you back to the screen that forced the login behavior, but it sends you to the home page if you directly select login

 - General Feature
    - Add `Follow` Feature and display followed users in the dashboards
      - do i need to add a block feauture?
    - Comments/Rating functionality
    - Review all cacheing behavior
    - Email Feature
      - Purchase confirmations
      - General Marketing

 - File Storage
    - Set up Malware scanning
    - Set up Additional S3 Logic
      - Need an isolated pre-malware scan bucket!
      - See if there better practices for how to organize all of this
    - Set up free tier quota

 - Add validation to all forms

 - SQS Queue
    - Add retry logic
        - https://docs.aws.amazon.com/lambda/latest/operatorguide/sqs-retries.html
        - https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-util-retry/
    - Add deadletter queue
    - Add ROBUST TESTING

  - Misc...
      - Look at Wappalyzer on https://edm.com/
