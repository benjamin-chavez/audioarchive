// apps/server/src/controllers/cart-item.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import MeService from '../services/me.service';
import CartService from '../services/cart.service';
import { CartItem } from '@shared/src';
import CartItemService from '../services/cart-item.service';

// export const createCartItem: RequestHandler = asyncHandler(async (req, res) => {
//   const cartItemData: Partial<CartItem> = req.body;

//   const newCartItem = await CartItemService.createCartItem(cartItemData);

//   res
//     .status(200)
//     .json({ data: newCartItem, message: 'Successfully added item to cart' });
// });

export const getMyCartWithCartItems: RequestHandler = asyncHandler(
  async (req, res) => {
    // @ts-ignore
    const authId = req.auth.sub;
    const appUser = await MeService.getMe(authId);
    const cartWithItems = await CartService.getCartWithCartItems(appUser.id);

    res.status(200).json({
      data: cartWithItems,
      message: 'Cart with cart items successfully retrieved',
    });
  }
);

export const addItemToCart: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  const authId = req.auth.sub;
  const appUser = await MeService.getMe(authId);
  const cartItemData = req.body;

  const cartWithItems = await CartService.addItemToCart(
    appUser.id,
    cartItemData
  );

  res.status(200).json({
    data: cartWithItems,
    message: 'Cart with cart items successfully retrieved',
  });
});

// export const createCart: RequestHandler = asyncHandler(async (req, res) => {
//   const appUserId = req.
//   const appUser = await MeService.getMe(appUserId);
//   const cart = await CartService.createCart(appUser.id);

//   res.status(200).json({ data: {} });
// });

// export const getMyCart: RequestHandler = asyncHandler(async (req, res) => {
//   // @ts-ignore
//   const authId = req.auth.sub;
//   const appUser = await MeService.getMe(authId);
//   const cart = await CartService.getCart(appUser.id);

//   res.status(200).json({ data: cart, message: 'Successfully retreived cart' });
// });

// export const updateMyCart: RequestHandler = asyncHandler(async (req, res) => {
//   // @ts-ignore
//   const authId = req.auth.sub;
//   const appUser = await MeService.getMe(authId);

//   const cartData = req.body;
//   const updatedCart = await CartService.updateActiveCartByAppUserId(
//     appUser.id,
//     cartData
//   );

//   res
//     .status(200)
//     .json({ data: updatedCart, message: 'Cart successfully updated' });
// });

// export const updateCart: RequestHandler = asyncHandler(async (req, res) => {
//   const cartId = parseInt(req.params.id, 10);
//   const cartData = req.body;

//   const updatedCart = await CartService.updateCartById(cartId, cartData);

//   res
//     .status(200)
//     .json({ data: updatedCart, message: 'Successfully updated cart' });
// });

export const deleteCartItem: RequestHandler = asyncHandler(async (req, res) => {
  const cartItemId = parseInt(req.params.cartItemId);
  await CartService.deleteCartItem(cartItemId);

  res.status(200).json({ message: 'Cart Item deleted successfully' });
});
