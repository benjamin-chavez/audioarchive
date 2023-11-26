// apps/server/src/models/customer.model.ts

import { StripeCustomer } from '@shared/src';
import knex from '../config/database';

class StripeCustomerModel {
  // public id: number;
  // public appUserId: number;
  // public stripeCustomerId: string;
  // constructor(customer: Customer) {
  //   this.id = customer.id;
  //   this.appUserId = customer.appUserId;
  //   this.stripeCustomerId = customer.stripeCustomerId;
  // }

  private static tableName = 'customers';

  static async create(
    customerData: Pick<StripeCustomer, 'appUserId' | 'stripeCustomerId'>
  ): Promise<StripeCustomer> {
    const results: StripeCustomer[] = await knex(this.tableName)
      .insert(customerData)
      .returning('*');

    const newCustomer = results[0];

    if (!newCustomer) {
      throw new Error('Failed to create new customer');
    }

    return newCustomer;
  }

  static async findBy(
    field: keyof StripeCustomer,
    value: unknown
  ): Promise<StripeCustomer | null> {
    const customer: StripeCustomer | undefined = await knex(this.tableName)
      .where({ [field]: value })
      .first();

    return customer || null;
  }
}

export default StripeCustomerModel;
