// apps/server/src/database/seeds/development/03-stripe-accounts.ts

import { Knex } from 'knex';

const TABLE_NAME = 'accounts';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  const currentTimestamp = new Date().toISOString();
  // const currentTimestamp = new Date();

  const [appUser1] = await knex('app_users')
    .select('id')
    .where('display_name', 'Amin Chavez');

  console.log(appUser1.id);

  await knex(TABLE_NAME).insert([
    {
      app_user_id: appUser1.id,
      stripe_account_id: 'acct_1OBsdHR8QsErjyla',
      charges_enabled: true,
      payouts_enabled: true,
      details_submitted: true,
      default_account: true,
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
    {
      app_user_id: appUser1.id + 1,
      stripe_account_id: 'acct_1OBsoPQvZQFMaerv',
      charges_enabled: true,
      payouts_enabled: true,
      details_submitted: true,
      default_account: true,
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
    {
      app_user_id: appUser1.id + 2,
      stripe_account_id: 'acct_1OBstLQpzpp1vjpb',
      charges_enabled: true,
      payouts_enabled: true,
      details_submitted: true,
      default_account: true,
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    },
  ]);
}
