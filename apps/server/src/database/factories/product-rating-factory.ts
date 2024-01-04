// apps/server/src/database/factories/product-factory.ts

import { faker } from '@faker-js/faker';

export function ProductRatingFactory(productId, appUserId) {
  const currentTimestamp = new Date().toISOString();

  return {
    rating: faker.number.int({ min: 1, max: 5 }),
    productId: productId,
    appUserId: appUserId,
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
  };
}
