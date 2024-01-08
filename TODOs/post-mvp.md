<!-- TODOs/post-mvp.md -->

# POST MVP TODOs
  - ### AWS & General Infrastructure:
    - Add public and private key rotation - will likely want to switch over to Key Management Service (KMS)
    - CloudFront
      - Set up signed-urls for project files
      - define base url so that it does not link to cloudfront
    - Look into adding `serverless framework` and splitting iac between terraform and serverless

  - ### Performance Optimizations:
    - Caching
      - the cached images/data on the product-show/product-details page should be the same as the products index page?


  - ### Misc. Backend
    -


  - ### Search:
    -


  - ### Database:
    - Look into dbdocs.io and/or SchemaSpy for adding database schema documentation
    - Potentially create new `database/functions` and `database/triggers` folders that are treated similar to the `database/migrations` folder


  - ### Cart:
    - Cart Dropdown menu
    - Add `previously purchased` badge to owned cart items


  - ### Payments:
    - Look into adding a second payment provider
    - Allow Sellers to sell subscriptions at least for `Track Feedback`, but ideally for anything in their store


  - ### Admin Dashboard:
    - Add Analytics


  - ### Product:
    - Add scheduling feature to product publishing. You may need to update the way you are handling products, specifically when you are handling products based on their status
    - Add ability to handle multiple pictures and/or video media - Will need to update the model, the show page, the product-form, and...
    - Product Index Page
        - Infinite Scroll? - Might not be worth the SEO challenges

 - ### Footer:
    -

 - ### User Dashboard:
    -

 - ### Auth:
    -

 - ### Follow Feature:
    - Extend `Follow` feature to handle `Blocking` as well

 - ### Comments/Rating Functionality
    - Comments/Rating Functionality
      - Add nested comments feature to allow sellers to respond to comments/reviews
      - Clean up the overall API logic for product_ratings, product_reviews, and product_feedback
      - show average rating on product cards?
      - Is there a better way to display ratings/reviews as separate entities?
      - Add `Report` Review/Comment functionality


  - ### Email and Notifactions Feature:
    - General Marketing
    - Notifications - Add Notification logic
      - When a user receives a message
      - An owned product/previously purchased product is updated


  - ### Audio/Playback:
    - Create a queue?
    - Display an image rendering of the waveform
    - Add Audio Watermark functionality for theft/audio ripping protection


  - ### File Storage
    - Create Waveform image rendering on file upload
    - Scan uploaded files for metadata?


  - ### SQS Queue:
      -


  - ### Messaging:
      -


  - ### General Feature:
      -


  - ### UI/Styles...
      -

  - ### SEO:
      -

  - ### Misc...
      - Look at Wappalyzer on https://edm.com/
      - Swagger? => See branch: [add-cart-context-and-swagger](https://github.com/benjamin-chavez/audioarchive/compare/master...add-cart-context-and-swagger)
      - Directory Structure: [Delightful React File/Directory Structure](https://www.joshwcomeau.com/react/file-structure/)
      - React API Layer: [Why You Need an API Layer and How To Build It in React](https://semaphoreci.com/blog/api-layer-react)
      - Graceful Shutdown example: [cgmartin/express-api-server](https://github.com/cgmartin/express-api-server/blob/master/src/lib/graceful-shutdown.js)
      - Express Examples: [https://github.com/expressjs/express/tree/master/examples](https://github.com/expressjs/express/tree/master/examples)
      - Look into: `RTK Query OpenAPI` and/or `GraphQL codegens`

https://medium.com/inforwaves-blogs/how-to-setup-redux-toolkit-in-next-js-app-router-82bde47fb863
