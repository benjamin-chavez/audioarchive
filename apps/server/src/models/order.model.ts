// apps/server/src/models/order.model.ts

import { Order } from '@shared/src';
import knex from '../config/database';

class OrderModel {
  private static tableName = 'orders';

  static async findBy(
    field: keyof Order,
    value: unknown
  ): Promise<Order | null> {
    const order: Order | undefined = await knex(this.tableName)
      .where({ [field]: value })
      .first();

    return order || null;
  }

  static async create(orderData: Partial<Order>): Promise<Order> {
    const results: Order[] = await knex(this.tableName)
      .insert(orderData)
      .returning('*');

    const newOrder = results[0];

    if (!newOrder) {
      throw new Error('Failed to create new order');
    }

    return newOrder;
  }

  static async updateBy(
    // stripeCheckoutSessionId: string,
    field: keyof Order,
    value: unknown,
    orderData: Partial<Order>
  ): Promise<Order> {
    const updatedOrders = await knex(this.tableName)
      .where({ [field]: value })
      .update(orderData)
      .returning('*');

    return updatedOrders[0];
  }
}

export default OrderModel;
