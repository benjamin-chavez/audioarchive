// apps/server/src/database/factories/product-factory.ts

import { faker } from '@faker-js/faker';

export function ProductReviewFactory(productId, appUserId) {
  const currentTimestamp = new Date(); //.toISOString();

  return {
    title: faker.lorem.words({ min: 0, max: 7 }),
    comment: faker.lorem.paragraphs({ min: 1, max: 3 }),
    productId: productId,
    appUserId: appUserId,
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
  };
}
