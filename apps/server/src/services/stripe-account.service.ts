// apps/server/src/services/stripe-account.service.ts

import { Account } from '@shared/src/schemas';
import StripeAccountModel from '../models/stripe-account.model';
import Stripe from 'stripe';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class StripeAccountService {
  static async getAllStripeAccountsByAppUser(appUserId: number): Promise<any> {
    // const stripeAccounts: Account[] =
    const stripeAccounts: any[] =
      await StripeAccountModel.getAllStripeAccountsByAppUser(appUserId);

    // TODO: You could generate the link on click and then redirect from the backend instead so that you aren't running this for every account on every dashaboard
    const stripeAccountsWithLinks = await Promise.all(
      stripeAccounts.map(async (account) => {
        if (!account.detailsSubmitted) {
          account.accountLink = await stripe.accountLinks.create({
            account: account.stripeAccountId,
            refresh_url: 'https://example.com/reauth',
            return_url: 'http://localhost:3000/dashboard/accounts',
            type: 'account_onboarding',
            collect: 'eventually_due',
          });
        }
        return account;
      })
    );
    // console.log(stripeAccountsWithLinks);

    // return stripeAccounts;
    return stripeAccountsWithLinks;
  }
}

export default StripeAccountService;
