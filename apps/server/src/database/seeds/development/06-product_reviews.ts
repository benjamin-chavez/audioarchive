// apps/server/src/database/seeds/development/04-product_reviews.ts

import { Knex } from 'knex';

import { ProductRatingFactory } from '../../factories/product-rating-factory';
import { ProductReviewFactory } from '../../factories/product-review-factory';

const REVIEWS_TABLE = 'product_reviews';
const RATINGS_TABLE = 'product_ratings';

function getRandomIndicies<T>(arr: T[], count): number[] {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }

  const randomIndiciesSet: Set<number> = new Set();

  for (let i = 0; i < count; i++) {
    try {
      randomIndiciesSet.add(Math.floor(Math.random() * arr.length));
    } catch (error) {}
  }

  return [...randomIndiciesSet];
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

const TABLE_NAME = 'product_reviews';

export async function seed(knex: Knex): Promise<void> {
  console.log(`Seeding ${TABLE_NAME} seeds`);

  await knex(REVIEWS_TABLE).del();

  const products = await knex('products').select('id');
  const appUsers = await knex('appUsers').select('id');

  const ReviewSeedData: ReturnType<typeof ProductReviewFactory>[] = [];
  const RatingSeedData: ReturnType<typeof ProductRatingFactory>[] = [];

  const min = 0;
  const max = 3;
  products.forEach((product) => {
    const reviewsPerProduct = Math.round(Math.random() * (max - min)) + min;
    const randomIndicies = getRandomIndicies(appUsers, reviewsPerProduct);

    randomIndicies.forEach((idx) => {
      if (appUsers.length === 0) return;

      const appUserId = appUsers[idx].id;

      const createReview = getRandomBoolean();
      const createRating = getRandomBoolean();

      if (createReview) {
        const productReview = ProductReviewFactory(product.id, appUserId);
        ReviewSeedData.push(productReview);
      }

      if (createRating) {
        const productRating = ProductRatingFactory(product.id, appUserId);
        RatingSeedData.push(productRating);
      }
    });
  });

  await knex(REVIEWS_TABLE).insert(ReviewSeedData);
  await knex(RATINGS_TABLE).insert(RatingSeedData);
}
