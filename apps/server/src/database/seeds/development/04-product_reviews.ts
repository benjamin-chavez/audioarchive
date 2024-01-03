// apps/server/src/database/seeds/development/04-product_reviews.ts

import { Knex } from 'knex';
import { ProductReviewFactory } from '../../factories/product-review-factory';

const TABLE_NAME = 'product_reviews';
// const COUNT = 150;

// function getRandomElementAndRemove<T extends { id: number }>(arr: T[]): T {
function getRandomElementAndRemove<T>(arr: T[]): number {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  // return arr.splice(randomIndex, 1)[0];
  //
  return randomIndex;
}

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();

  const products = await knex('products').select('id');
  const appUsers = await knex('appUsers').select('id');
  console.log(products);
  console.log(appUsers);

  const seedData: ReturnType<typeof ProductReviewFactory>[] = [];

  const min = 1;
  const max = 3;
  products.forEach((product) => {
    // for (let i = 0; i < COUNT; i++) {
    const reviewsPerProduct = Math.round(Math.random() * (max - min)) + min;
    console.log(reviewsPerProduct);

    for (let j = 0; j < reviewsPerProduct; j += 1) {
      if (appUsers.length === 0) break;

      // const randomAppUserId = getRandomElementAndRemove(appUsers).
      // id;
      const randomAppUserId = getRandomElementAndRemove(appUsers);
      const productReview = ProductReviewFactory(product.id, randomAppUserId);
      seedData.push(productReview);
    }
    // }
  });
  await knex(TABLE_NAME).insert(seedData);
}
