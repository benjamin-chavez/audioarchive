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

  static async updateCartItemsByCartId(
    cartId: number,
    cartItems: any
  ): Promise<any> {
    if (!cartItems) {
      throw new BadRequestError('Invalid cart data provided');
    }

    const prunedCartItems = cartItems
      .filter((item) => item.quantity)
      .map((item) => {
        return {
          cartId,
          productId: item.productId,
          quantity: item.quantity,
        };
      });

    const queries = cartItems.map((item) =>
      CartItemModel.upsertCartItem({ cartId, cartItem: item })
    );
    const results = await Promise.allSettled(queries);

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Item ${index} updated successfully:`, result.value);
      } else {
        console.error(`Error updating item ${index}:`, result.reason);
      }
    });

    // if (!updatedCart) {
    //   throw new NotFoundError('cart not found or failed to update');
    // }

    // return updatedCart;
    // return prunedCartItems;

    const summary = {
      successCount: results.filter((result) => result.status === 'fulfilled')
        .length,
      errors: results
        .filter((result) => result.status === 'rejected')
        // @ts-ignore
        .map((result) => result.reason),
    };
    return summary;

    // const successfulUpdates = results
    //   .filter((result) => result.status === 'fulfilled')
    //   .map((result) => result.value); // assuming result.value contains meaningful data

    // const errors = results
    //   .filter((result) => result.status === 'rejected')
    //   .map((result) => result.reason);

    // return { successfulUpdates, errors };
  }
}

export default CartItemService;
