// apps/server/src/models/stripe-account.model.ts

import { Account } from '@shared/src/schemas';
import knex from '../config/database';

class StripeAccountModel {
  private static tableName = 'accounts';

  static async getAllStripeAccountsByAppUser(appUserId: number): Promise<any> {
    const stripeAccounts = await knex(this.tableName)
      .where('appUserId', appUserId)
      .select('*');

    return stripeAccounts;
  }
}

export default StripeAccountModel;
