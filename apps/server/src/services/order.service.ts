// apps/server/src/services/order.service.ts

import { Order } from '@shared/src';
import { BadRequestError, NotFoundError } from '../middleware/customErrors';
import OrderModel from '../models/order.model';

class OrderService {
  static async create(orderData: Partial<Order>): Promise<Order> {
    if (
      !orderData.appUserId
      // ||
      // !orderData.stripePaymentIntentId ||
      // !orderData.stripeCheckoutSessionId
    ) {
      throw new BadRequestError(
        'Stripe customer creation requires an app user ID and a Stripe customer ID'
      );
    }

    const newOrder = await OrderModel.create(orderData);
    return newOrder;
  }

  // TODO: REMOVE AND UPDATE ALL CALLING LOCATIONS
  static async getOrderByCheckoutSessionId(
    stripeCheckoutSessionId: string
  ): Promise<Order> {
    const order = await OrderModel.findBy(
      'stripeCheckoutSessionId',
      stripeCheckoutSessionId
    );
    if (!order) {
      throw new NotFoundError(`App user ${stripeCheckoutSessionId} not found`);
    }
    return order;
  }

  static async getBy(field: keyof Order, value: unknown): Promise<Order> {
    const order = await OrderModel.findBy(field, value);
    if (!order) {
      throw new NotFoundError(`Order with ${field}: ${value} not found`);
    }

    return order;
  }

  // TODO: WHEN YOU ARE ADDING ERROR HANDLING/VALIDATION TO THESE UPDATE
  // TODO: METHODS, CONSIDER CONSOLIDATING THEM INTO ONE updateBy() METHOD
  static async updateByCheckoutSessionId(
    stripeCheckoutSessionId: string,
    orderData: Partial<Order>
  ): Promise<Order> {
    // TODO: Add validation logic
    console.log('orderData', orderData);

    if (!orderData) {
      throw new BadRequestError('Invalid order data provided');
    }

    const order = await OrderModel.updateBy(
      'stripeCheckoutSessionId',
      stripeCheckoutSessionId,
      orderData
    );

    if (!order) {
      throw new NotFoundError('Order not found or failed to update');
    }

    return order;
  }

  static async updateByOrderId(
    orderId: number,
    orderData: Partial<Order>
  ): Promise<Order> {
    // TODO: Add validation logic
    // console.log('orderData', orderData);

    if (!orderData) {
      throw new BadRequestError('Invalid order data provided');
    }

    const order = await OrderModel.updateBy('id', orderId, orderData);

    if (!order) {
      throw new NotFoundError('Order not found or failed to update');
    }

    return order;
  }
}

export default OrderService;
