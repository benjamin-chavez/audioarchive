// apps/server/src/controllers/accounts.controller.ts

import express, { RequestHandler, response } from 'express';
import asyncHandler from 'express-async-handler';
import knex from '../config/database';
import Stripe from 'stripe';
import MeService from '../services/me.service';
// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeAccount: RequestHandler = asyncHandler(
  async (req, res) => {
    // @ts-ignore
    const authId = req.auth.sub;
    const appUser = await MeService.getMe(authId);

    console.log('CREATE STRIPE ACCOUNT');
    const country = 'US';
    const serviceAgreement = country === 'US' ? 'full' : 'recipient';

    const params: Stripe.AccountCreateParams = {
      type: 'express',
      country: 'US',
      email: 'aminchavez.music@gmail.com',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: 'individual',
      business_profile: {
        mcc: '5734',
        name: appUser.username,
        product_description: 'product description',
        support_email: 'support@audio-archive.com',
        url: 'https://aminchavez.com',
      },
      tos_acceptance: {
        service_agreement: serviceAgreement,
      },
    };

    const account: Stripe.Account = await stripe.accounts.create(params);

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'http://localhost:3000/dashboard/accounts',
      return_url: 'http://localhost:3000/dashboard/accounts',
      type: 'account_onboarding',
      collect: 'eventually_due',
    });

    // @ts-ignore
    const results: Account[] = await knex('accounts')
      .insert({
        appUserId: appUser.id,
        stripeAccountId: account.id,
      })
      .returning('*');

    const newAccount = results[0];

    if (!newAccount) {
      throw new Error('Creation failed');
    }

    // response(301, allowOtherHost: true)
    // return newAccount;

    res.status(200).json({ data: { accountLink: accountLink } });
  }
);

// export const createStripeAccountLink: RequestHandler = asyncHandler(
//   async (req, res) => {
//     // @ts-ignore
//     const authId = req.auth.sub;
//     const appUser = await MeService.getMe(authId);

//     console.log('CREATE STRIPE ACCOUNT LINK');
//     // const country = 'US';
//     // const serviceAgreement = country === 'US' ? 'full' : 'recipient';

//     // const params: Stripe.AccountCreateParams = {
//     //   type: 'custom',
//     //   country: 'US',
//     //   email: 'aminchavez.music@gmail.com',
//     //   capabilities: {
//     //     card_payments: { requested: true },
//     //     transfers: { requested: true },
//     //   },
//     //   business_type: 'individual',
//     //   business_profile: {
//     //     mcc: '5734',
//     //     name: appUser.username,
//     //     product_description: 'product description',
//     //     support_email: 'support@audio-archive.com',
//     //     url: 'https://aminchavez.com',
//     //   },
//     //   tos_acceptance: {
//     //     service_agreement: serviceAgreement,
//     //   },
//     // };

//     // const account: Stripe.Account = await stripe.accounts.create(params);

//     const accountLink = await stripe.accountLinks.create({
//       account: account.id,
//       // refresh_url: 'https://example.com/reauth',
//       refresh_url: new_account_url,
//       return_url: 'http://localhost:3000/dashboard/accounts',
//       type: 'account_onboarding',
//       collect: 'eventually_due',
//     });

//     // @ts-ignore
//     const results: Account[] = await knex('accounts')
//       .insert({
//         appUserId: appUser.id,
//         stripeAccountId: account.id,
//       })
//       .returning('*');

//     const newAccount = results[0];

//     if (!newAccount) {
//       throw new Error('Creation failed');
//     }

//     // response(301, allowOtherHost: true)
//     // return newAccount;

//     res.status(200).json({ data: { accountLink: accountLink } });
//   }
// );
