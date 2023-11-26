// apps/server/src/models/cart.model.ts

import {
  AppUser,
  Cart,
  CartItem,
  CartStatusEnum,
  CartWithCartItems,
} from '@shared/src';
import knex from '../config/database';
import { sanitize } from '../lib/utils';

class CartModel {
  private static tableName = 'carts';

  static async create(appUserId: number): Promise<Cart> {
    const newCart: Cart[] = await knex(this.tableName)
      .insert({ appUserId })
      .returning('*');

    return newCart[0];
  }

  static async findBy(
    field: keyof Cart,
    value: unknown,
    cartStatus: CartStatusEnum = 'active'
  ): Promise<Cart | null> {
    // ): Promise<Cart> {
    const cart: Cart = await knex(this.tableName)
      .where({
        [field]: value,
        status: cartStatus,
      })
      .first();

    // return cart;
    return cart || null;
  }

  static async getCartWithItems(
    appUserId: number
  ): Promise<CartWithCartItems | null | any> {
    // TODO: Update to use the `apps/server/src/database/queries/get-cart-with-items-and-products.sql` file instead
    const cartWithItems = await knex('carts')
      .select('carts.*')
      .select(
        knex.raw(`
    json_agg(
      json_build_object(
        'id', cart_items.id,
        'cart_id', cart_items.cart_id,
        'created_at', cart_items.created_at,
        'updated_at', cart_items.updated_at,
        'product', json_build_object(
          'id', products.id,
          'stripe_product_id', products.stripe_product_id,
          'stripe_account_id', accounts.stripe_account_id,
          'name', products.name,
          'genre', products.genre,
          'software', products.software,
          'bpm', products.bpm,
          'price', products.price,
          'img_s3_key', products.img_s3_key,
          'img_s3_url', products.img_s3_url
        ),
        'app_user', json_build_object(
          'id', app_users.id,
          'username', app_users.username
        )
      )
    ) AS items
  `)
      )
      .leftJoin('cart_items', 'carts.id', 'cart_items.cart_id')
      .leftJoin('products', 'cart_items.product_id', 'products.id')
      .leftJoin('accounts', 'products.account_id', 'accounts.id')
      .leftJoin('app_users', 'products.app_user_id', 'app_users.id')
      .where('carts.app_user_id', appUserId)
      .andWhere('carts.status', 'active')
      .groupBy('carts.id');

    if (cartWithItems && cartWithItems[0] && cartWithItems[0].items) {
      cartWithItems[0].items = Object.values(cartWithItems[0].items);
    }

    const cartData = sanitize(cartWithItems);

    return cartData;
  }

  static async updateById(
    cartId: number,
    cartData: Partial<Cart>
  ): Promise<Cart | null> {
    return knex(this.tableName).where({ id: cartId }).update(cartData);
  }

  static async updateActiveCartByAppUserId(
    appUserId: number,
    cartData: Partial<Cart>
  ): Promise<Cart | null> {
    const updatedCarts: Cart[] = await knex(this.tableName)
      .where({ appUserId, status: 'active' })
      .update(cartData)
      .returning('*');

    return updatedCarts[0];
  }
}

export default CartModel;
