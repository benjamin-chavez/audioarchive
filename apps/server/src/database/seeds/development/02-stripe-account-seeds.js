const TABLE_NAME = 'accounts';
const currentTimestamp = new Date().toISOString();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();
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
};
