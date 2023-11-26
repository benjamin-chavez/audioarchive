// apps/server/src/models/cart-item.model.ts

import { AppUser, Cart, CartItem, CartStatusEnum } from '@shared/src';
import knex from '../config/database';

class CartItemModel {
  private static tableName = 'cartItems';

  static async create(cartId: number, productId: number): Promise<CartItem> {
    const newCartItem: CartItem[] = await knex(this.tableName)
      .insert({ cartId, productId })
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

  // static async updateById(
  //   cartId: number,
  //   cartData: Partial<Cart>
  // ): Promise<Cart | null> {
  //   return knex(this.tableName).where({ cartId }).update(cartData);
  // }

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
