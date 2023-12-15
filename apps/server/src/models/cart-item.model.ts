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

  static async upsertCartItem({
    cartId,
    cartItem,
  }: {
    cartId: number;
    cartItem: Partial<CartItem> | any;
  }): Promise<CartItem | any | null> {
    // TODO: START HERE: // TODO: START HERE: // TODO: START HERE: // TODO: START HERE:
    // TODO: LOOK AT `cartId` param of this func. it isn't getting passed in the psql query
    // "prunedCartItems  [
    // server:dev:clean:   {
    // server:dev:clean:     "cartId": 1,
    // server:dev:clean:     "productId": 2,
    // server:dev:clean:     "quantity": 2
    // server:dev:clean:   },
    // server:dev:clean:   {
    // server:dev:clean:     "cartId": 1,
    // server:dev:clean:     "productId": 5,
    // server:dev:clean:     "quantity": 1
    // server:dev:clean:   }
    // server:dev:clean: ]
    // server:dev:clean: Error updating item 0: error: insert into "cart_items" ("cart_id", "product_id", "quantity") values (DEFAULT, $1, $2) on conflict ("cart_id", "product_id") do update set "quantity" = $3 - null value in column "cart_id" of relation "cart_items" violates not-null constraint"
    return knex('cart_items')
      .insert({
        cartId: cartItem.cartId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
      })
      .onConflict(['cartId', 'productId'])
      .merge({ quantity: cartItem.quantity });
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
