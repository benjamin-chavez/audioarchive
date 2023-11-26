// apps/server/src/controllers/order.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import MeService from '../services/me.service';
import CustomerService from '../services/stripe-customer.service';
import OrderService from '../services/order.service';
import { Order } from '@shared/src';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createOrder: RequestHandler = asyncHandler(async (req, res) => {
export const createCheckout: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  const authId = req.auth.sub;
  const appUser = await MeService.getMe(authId);
  const cartItems = req.body;
  const customer = await CustomerService.getCustomerByAppUserId(appUser);
  const order: Order = await OrderService.create({
    appUserId: appUser.id,
  });
  const cartId = cartItems[0].cartId;

  const lineItems = cartItems.map((item) => {
    // console.log(item.product.imgS3Url);
    return {
      price_data: {
        currency: 'usd',
        // product: product.stripeProductId,
        product_data: {
          name: item.product.name,
          // images: [
          //   'https://res.cloudinary.com/dyy8g76av/image/upload/v1588621017/Aminchavez.com-thumbnail_iyqr0c.png',
          // ],
          // description: item.description,
          metadata: {
            id: item.product.id,
            stripe_product_id: item.product.stripeProductId,
            stripe_account_id: item.product.stripeAccountId,
          },
        },
        unit_amount: item.product.price * 100,
      },
      quantity: 1,
    };
  });

  const stripeSession = await stripe.checkout.sessions.create({
    customer: customer.stripeCustomerId,
    mode: 'payment',
    // ui_mode: 'embedded',
    line_items: lineItems,

    automatic_tax: { enabled: true }, // TODO: REVIEW TAXES
    customer_update: {
      address: 'auto',
      shipping: 'auto',
    },
    metadata: {
      app_order_id: order.id,
      cartId: cartId,
    },
    payment_intent_data: {
      metadata: {
        app_order_id: order.id,
        // application_fee_amount: 1000,
      },
    },
    // reciept_email: '' <= TODO: Look into this

    // http://localhost:3000/dashboard/accounts?session_id=cs_test_b1G45KX8hYXJidwcYiMlRlTDps8T5S8RAATT2eu5YywwZ4vwSlZv8RlUoG
    success_url: `${process.env.CLIENT_URL}/dashboard/accounts?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  const newOrder: Order = await OrderService.updateByOrderId(order.id, {
    stripeCheckoutSessionId: stripeSession.id,
  });

  if (!newOrder) {
    // TODO: "render :new"???
    console.log('render :new???');
  }
  console.log('NEW ORDER CREATED IN ORDER CONTROLLER!!!');

  res
    .status(200)
    .json({ data: stripeSession, message: 'Successfully created cart' });
});
