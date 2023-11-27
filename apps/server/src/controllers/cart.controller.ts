// apps/server/src/controllers/cart.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import MeService from '../services/me.service';
import CartService from '../services/cart.service';
import { CartWithCartItems } from '@shared/src';
import { Knex } from 'knex';
import knex from '../config/database';

export const createMyCart: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  const authId = req.auth.sub;
  const appUser = await MeService.getMe(authId);
  const newCart = await CartService.createCart(appUser.id);

  res.status(200).json({ data: newCart, message: 'Successfully created cart' });
});

// export const createCart: RequestHandler = asyncHandler(async (req, res) => {
//   const appUserId = req.
//   const appUser = await MeService.getMe(appUserId);
//   const cart = await CartService.createCart(appUser.id);

//   res.status(200).json({ data: {} });
// });

export const getMyCart: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  const authId = req.auth.sub;
  const appUser = await MeService.getMe(authId);
  const cart = await CartService.getCart(appUser.id);

  res.status(200).json({ data: cart, message: 'Successfully retreived cart' });
});

export const updateMyCart: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  const authId = req.auth.sub;
  const appUser = await MeService.getMe(authId);

  const cartData = req.body;
  const updatedCart = await CartService.updateActiveCartByAppUserId(
    appUser.id,
    cartData
  );

  res
    .status(200)
    .json({ data: updatedCart, message: 'Cart successfully updated' });
});

// export const updateCart: RequestHandler = asyncHandler(async (req, res) => {
//   const cartId = parseInt(req.params.id, 10);
//   const cartData = req.body;

//   const updatedCart = await CartService.updateCartById(cartId, cartData);

//   res
//     .status(200)
//     .json({ data: updatedCart, message: 'Successfully updated cart' });
// });
