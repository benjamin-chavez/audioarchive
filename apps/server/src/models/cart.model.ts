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
    const newCartRows: Cart[] = await knex(this.tableName)
      .insert({ appUserId })
      .returning(['id', 'appUserId']);

    console.log('**newCartRows', newCartRows);

    const newCart = newCartRows.map((row) => ({
      cartId: row.id,
      appUserId: row.appUserId,
    }));
    console.log('**newCart', newCart);

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

  static async getCartWithItems(appUserId: number): Promise<null | any> {
    // ): Promise<ApiCartData | null | any> {
    // TODO: Update to use the `apps/server/src/database/queries/get-cart-with-items-and-products.sql` file instead
    // TODO: **SQL Query Evaluation
    const cartWithItems = await knex('carts')
      .select(
        'carts.id as cart_id',
        'carts.app_user_id as app_user_id',
        knex.raw(`COALESCE(
          json_agg(
            json_build_object(
                'cart_item_id', cart_items.id,
                'cart_item_created_at', cart_items.created_at,
                'quantity', cart_items.quantity,
                'product_id', products.id,
                'name', products.name,
                'genre', products.genre_name,
                'daw', products.daw,
                'bpm', products.bpm,
                'price', products.price,
                'img_s3_key', products.img_s3_key,
                'img_s3_url', products.img_s3_url,
                'seller_id', app_users.id,
                'seller_username', app_users.username
            )
          ) FILTER (WHERE cart_items.id IS NOT NULL),
          '{}'::json
        ) AS items`)
      )
      .leftJoin('cart_items', 'carts.id', 'cart_items.cart_id')
      .leftJoin('products', 'cart_items.product_id', 'products.id')
      .leftJoin('app_users', 'products.app_user_id', 'app_users.id')
      .where('carts.app_user_id', appUserId)
      .andWhere('carts.status', 'active')
      .groupBy('carts.id');
    // console.log(
    //   'cartModel-getCartWithItems:',
    //   JSON.stringify(cartWithItems, null, 2)
    // );

    if (cartWithItems && cartWithItems[0] && cartWithItems[0].items) {
      cartWithItems[0].items = Object.values(cartWithItems[0].items);
    }

    // const cartData: ApiCartData = sanitize(cartWithItems)[0];
    const cartData = sanitize(cartWithItems)[0];

    // console.log('cartData', cartData);

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
