// apps/server/src/models/cart-item.model.ts

import { AppUser, Cart, CartItem, CartStatusEnum } from '@shared/src';

import knex from '../config/database';

class CartItemModel {
  private static tableName = 'cartItems';

  static async create(
    cartId: number,
    productId: number,
    quantity: number
  ): Promise<CartItem> {
    const newCartItem: CartItem[] = await knex(this.tableName)
      .insert({ cartId, productId, quantity })
      .returning('*');

    return newCartItem[0];
  }

  // static async findBy(
  //   field: keyof Cart,
  //   value: unknown,
  //   cartStatus: cartStatusEnum = 'active'
  // ): Promise<Cart | null> {
  //   // ): Promise<Cart> {
  //   const cart: Cart = await knex(this.tableName)
  //     .where({
  //       [field]: value,
  //       status: cartStatus,
  //     })
  //     .first();

  //   // return cart;
  //   return cart || null;
  // }

  static async upsertCartItem({
    cartId,
    cartItem,
  }: {
    cartId: number;
    cartItem: Partial<CartItem> | any;
  }): Promise<CartItem | any | null> {
    return (
      knex('cart_items')
        .insert({
          cartId: cartId,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        })
        .onConflict(['cartId', 'productId'])
        // .merge({
        //   quantity: knex.raw('cart_items.quantity + ?', [cartItem.quantity]),
        // });
        .merge({ quantity: cartItem.quantity })
    );
  }

  // static async updateActiveCartByAppUserId(
  //   appUserId: number,
  //   cartData: Partial<Cart>
  // ): Promise<Cart | null> {
  //   const updatedCarts: Cart[] = await knex(this.tableName)
  //     .where({ appUserId, status: 'active' })
  //     .update(cartData)
  //     .returning('*');

  //   return updatedCarts[0];
  // }

  static async delete(cartItemId: number): Promise<boolean> {
    const deletedRows = await knex(this.tableName)
      .where({ id: cartItemId })
      .del();

    return deletedRows > 0;
  }
}

export default CartItemModel;
