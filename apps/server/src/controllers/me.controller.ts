// apps/server/src/controllers/meController.ts

// TODO: YOU MIGHT WANT TO GET RID OF THE `MeService` AND MAKE THE CALLS TO AppUserService INSTEAD.

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import MeService from '../services/me.service';
import ProductService from '../services/product.service';
import StripeAccountService from '../services/stripe-account.service';

// Protected Routes for the authenticated user
// TODO:
export const getMe: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  const authId = req.auth.sub;
  const appUser = await MeService.getMe(authId);

  res.status(200).json({
    data: appUser,
    message: 'Authenticated AppUser retrieved successfully.',
  });
});

// TODO:
export const updateMe: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  const imgFile = req.files['imgFile'][0];
  // @ts-ignore
  const authId = req.auth.sub;
  const updatedAppUser = await MeService.updateMe(authId, req.body);

  res.status(200).json({
    data: updatedAppUser,
    message: 'Authenticated AppUser updated successfully.',
  });
});

export const deleteMe: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  const authId = req.auth.sub;
  await MeService.deleteMe(authId);

  res
    .status(200)
    .json({ message: 'Authenticated AppUser deleted successfully.' });
});

export const getMeWithProducts: RequestHandler = asyncHandler(
  async (req, res) => {
    // @ts-ignore
    const authId = req.auth.sub;
    const appUser = await MeService.getMe(authId);
    const products = await ProductService.getAllProductsByAppUser(appUser.id);

    // res.status(200).json({ data: { appUser: appUser, products: products } });
    res.status(200).json({ data: { appUser, products } });
  }
);

export const getMeWithStripeAccounts: RequestHandler = asyncHandler(
  async (req, res) => {
    // @ts-ignore
    const authId = req.auth.sub;

    const appUser = await MeService.getMe(authId);

    const stripeAccounts =
      await StripeAccountService.getAllStripeAccountsByAppUser(appUser.id);

    // res.status(200).json({ data: { appUser: appUser, products: products } });
    res.status(200).json({ data: { appUser, stripeAccounts } });
  }
);

// export const getMeWithProduct: RequestHandler = asyncHandler(
//   async (req, res) => {
//     // @ts-ignore
//     const authId: string = req.auth.sub;
//     const appUser = await MeService.getMe(authId);
//     const productId = parseInt(req.params['productId'], 10);

//     const product = await ProductService.getProductById(productId);

//     res.status(200).json({ data: { appUser, product } });
//   }
// );

export const getMyProductById: RequestHandler = asyncHandler(
  async (req, res) => {
    const productId = parseInt(req.params['productId'], 10);

    const product = await ProductService.getProductById(productId);

    res.status(200).json({ data: { product } });
  }
);
