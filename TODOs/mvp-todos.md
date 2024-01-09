<!-- TODOs/mvp-todos.md -->

# MVP TODOs
  - ### AWS:
    - Go through all IAM and narrow permissions
    - Setup automigration in the CI/CD Pipeline


  - ### Infrastructure:
    - Fix bug that breaks the CI/CD when you run a second `pnpm tfa` command
    - Rate Limiting


  - ### Misc. Backend
    - Add validation to all forms and API Routes:
      - API Route - [API Route - Query Param Validator](https://github.com/claclacla/Building-a-Node-Express.js-Rest-API-server-using-a-repository-pattern/blob/master/routes/validators/QueryParamsValidator.js)
    - Typescript
      - Update all database types/schemas
      - Add types for all api req/res messages
    - Review All Cacheing Behavior (nextjs, rtk, react-query)


  - ### Search:
    - Finish setting up product filter functionality
    - Fix numeric product filters
    - Set up Artist Search Filtering
    - Update all Filter ui component(s) to make the filtering feel more controlled and less all over the place. So like showing all filters at once and/or showing all active filters
    - filtering should work as `filter & filter` not `filter || filter`??
    - resources:
      - [postgres-full-text-search-is-good-enough](https://rachbelaid.com/postgres-full-text-search-is-good-enough/)
      - [postgres-full-text-search-engine](https://xata.io/blog/postgres-full-text-search-engine)
      - [postgres-full-text-search-a-search-engine-in-a-database](https://www.crunchydata.com/blog/postgres-full-text-search-a-search-engine-in-a-database)

 - ### Database:
    <!-- //- Add Genres to Product Seeds -->
    - Clean up Seed Files
    - Write updated seed data/functions
      - Must get updated Stripe data
      - Must have significantly higher volume
    - convert the `/api/app-users/register` route to a webhook route. Something like `/api/webhooks/auth0/register`.
    <!-- //- Add Social Links to appUser table -->


 - ### Cart:
    - Fix formatting
        - order total `$NAN`
    - update with tax info
    - Add to cart toast notification


 - ### Payments:
    - Post question on stripe reddit about best practices for digital product marketplaces
    - set up tax logic
    - finish setting up/review payout logic
    - review if you need to avoid selling in certain regions
    - Add the subscription model for sellers who want to sell above a certain quota of disk space
    - Completed purchase redirect should go to a confirm page or go to the dashboard download page


 - ### Admin Dashboard:
    - The navbar option for this should only be visible to Admin users
    - Add ability to update featured products


 - ### Seller Dashboard:
    - Fix the product update logic so that the project file name is loaded
    - Reorganize the `My Accounts` section.
    - Add screen to display all orders
    - Fix Product update logic so that users can only edit their own products**


 - ### Product:
    - Update Product Types:
      - Project Files, Sample Packs, Pre-recorded Courses, Lessons, Mixing/Mastering Services, Track Feedback (recurring)
    - Show Page
        - Should pull all data from actual product
        - Add a Download Button if user already purchased product
    *- Index Page
        *- Stream in data
    <!-- //- Add Featured Products component -->


 - ### Footer:
    <!-- //- Add Component -->
    - Plan links and content


 - ### User Dashboard:
    - Add screen to display all purchases/downloads


 - ### Auth:
    - Migrate to Cognito, SupaBase, or something other than auth0?
    - Login Redirect screen - Currently takes you back to the screen that forced the login behavior, but it sends you to the home page if you directly select login
    - Add Role Management


 - ### Follow Feature:
    - Add `Follow` Feature and display followed users in the dashboards


 - ### Comments/Rating Functionality
    - Ensure that a user can only rate and review products they own
    - Ensure a seller cannot rate/review their own products
    - Figure out how/where to show ratings that are not accompanies by a review
    - Add optimistic updates for when a user adds a new rating/review
    - Add sort/filter functionality for comments/ratings
    - Is there a better way to display ratings/reviews as separate entities?
    - add toast?


  - ### Email and Notifactions Feature:
    - Purchase confirmations
    - Notifications - Add Notification logic
      - When a seller sells a product


  - ### Audio/Playback:
    - Add audio player functionality
    - Create a global context for the audio player


  - ### File Storage
    - Set up Malware scanning
    - Set up Additional S3 Logic
      - Need an isolated pre-malware scan bucket
      - See if there better practices for how to organize all of this
    - Set up free tier quota/limit to how much storage a user gets for free


  - ### SQS Queue:
    - Add retry logic
        - https://docs.aws.amazon.com/lambda/latest/operatorguide/sqs-retries.html
        - https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-util-retry/
    - Add deadletter queue
    - Add ROBUST TESTING


 - ### General Feature:
    - Favorites
      - Add Screen to display all favorites
      - Add Toast Notifications to Favorites Logic


  - ### UI/Styles...
    - https://react-spectrum.adobe.com/react-aria/examples/index.html
    - https://github.com/adobe/react-spectrum/tree/main/examples/rac-tailwind
    - Add clsx and cv packages
    - Create UI Components:
      - Avatar
      - Button
