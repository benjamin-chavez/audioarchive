// apps/server/src/database/seeds/development/03-stripe-accounts.ts

import { Knex } from 'knex';
// import argon2 from 'argon2';

const TABLE_NAME = 'accounts';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  // const currentTimestamp = new Date().toISOString();
  const currentTimestamp = new Date();

  await knex(TABLE_NAME).insert([
    {
      appUserId: 2,
      stripeAccountId: 'acct_1OBsdHR8QsErjyla',
      chargesEnabled: true,
      payoutsEnabled: true,
      detailsSubmitted: true,
      defaultAccount: true,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    },
    {
      appUserId: 3,
      stripeAccountId: 'acct_1OBsoPQvZQFMaerv',
      chargesEnabled: true,
      payoutsEnabled: true,
      detailsSubmitted: true,
      defaultAccount: true,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    },
    {
      appUserId: 4,
      stripeAccountId: 'acct_1OBstLQpzpp1vjpb',
      chargesEnabled: true,
      payoutsEnabled: true,
      detailsSubmitted: true,
      defaultAccount: true,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    },
  ]);
}
