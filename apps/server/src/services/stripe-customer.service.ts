// apps/server/src/services/customer.service.ts

import { AppUser, StripeCustomer } from '@shared/src';
import Stripe from 'stripe';
import { BadRequestError } from '../middleware/customErrors';
import CustomerModel from '../models/stripe-customer.model';
// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class CustomerService {
  static async createStripeCustomer(
    stripeCustomer: Pick<StripeCustomer, 'appUserId' | 'stripeCustomerId'>
  ): Promise<StripeCustomer> {
    if (!stripeCustomer.appUserId || !stripeCustomer.stripeCustomerId) {
      throw new BadRequestError(
        'Stripe customer creation requires an app user ID and a Stripe customer ID'
      );
    }

    const newStripeCustomer = await CustomerModel.create(stripeCustomer);
    return newStripeCustomer;
  }

  static async getCustomerByAppUserId(
    appUser: AppUser
  ): Promise<StripeCustomer> {
    let stripeCustomer = await CustomerModel.findBy('appUserId', appUser.id);

    if (!stripeCustomer) {
      let newStripeCustomer = await stripe.customers.create({
        email: appUser.email,
      });

      stripeCustomer = await CustomerService.createStripeCustomer({
        appUserId: appUser.id,
        stripeCustomerId: newStripeCustomer.id,
      });
    }

    return stripeCustomer;
  }
}

export default CustomerService;
