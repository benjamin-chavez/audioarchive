// apps/server/src/services/cart-item.service.ts

import { Cart, CartItem } from '@shared/src';
import { BadRequestError, NotFoundError } from '../middleware/customErrors';
import CartModel from '../models/cart.model';
import CartItemModel from '../models/cart-item.model';

class CartItemService {
  // static async createCartItem(
  //   cartItemData: Partial<CartItem>
  // ): Promise<CartItem> {
  //   // TODO: handle case when cart is not found
  //   // TODO: handle case when cart-item already exists
  //   const newCart = await CartItemModel.create(cartItemData);
  //   return newCart;
  // }
  // static async getCart(appUserId: number): Promise<Cart> {
  //   let cart = await CartModel.findBy('appUserId', appUserId);
  //   if (!cart) {
  //     cart = await this.createCart(appUserId);
  //   }
  //   return cart;
  // }
  // static async updateActiveCartByAppUserId(
  //   appUserId: number,
  //   cartData: Partial<Cart | null>
  // ): Promise<Cart> {
  //   if (!cartData) {
  //     throw new BadRequestError('Invalid cart data provided');
  //   }
  //   const updatedCart = await CartModel.updateActiveCartByAppUserId(
  //     appUserId,
  //     cartData
  //   );
  //   if (!updatedCart) {
  //     throw new NotFoundError('cart not found or failed to update');
  //   }
  //   return updatedCart;
  // }
  // static async updateCartById(
  //   cartId: number,
  //   cartData: Partial<Cart | null>
  // ): Promise<Cart> {
  //   if (!cartData) {
  //     throw new BadRequestError('Invalid cart data provided');
  //   }
  //   const updatedCart = await CartModel.updateById(cartId, cartData);
  //   if (!updatedCart) {
  //     throw new NotFoundError('cart not found or failed to update');
  //   }
  //   return updatedCart;
  // }
}

export default CartItemService;
