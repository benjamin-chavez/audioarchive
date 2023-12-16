// apps/server/src/services/cart.service.ts

import { Cart, CartItem, CartWithCartItems, Product } from '@shared/src';
import { BadRequestError, NotFoundError } from '../middleware/customErrors';
import CartModel from '../models/cart.model';
import CartItemModel from '../models/cart-item.model';
import S3Service from './s3.service';
import { isEmpty } from '../lib/utils';
import CartItemService from './cart-item.service';

class CartService {
  static async createCartItem(
    cartItemData: Partial<CartItem> | any
  ): Promise<CartItem> {
    const { cartId, productId, quantity } = cartItemData;

    if (!cartId || !productId || !quantity) {
      // TODO: add Error message
      throw Error;
    }

    const newCartItem: CartItem = await CartItemModel.create(
      cartId,
      productId,
      quantity
    );

    return newCartItem;
  }

  static async createCart(appUserId: number): Promise<Cart> {
    // TODO: handle case when user is not found
    // TODO: handle case when cart already exists
    const newCart = await CartModel.create(appUserId);

    return newCart;
  }

  static async getCart(appUserId: number): Promise<Cart> {
    let cart = await CartModel.findBy('appUserId', appUserId);

    if (!cart) {
      cart = await this.createCart(appUserId);
    }

    return cart;
  }

  static async getCartWithCartItems(
    appUserId: number
  ): Promise<CartWithCartItems | any> {
    let cartData: CartWithCartItems | null | any =
      await CartModel.getCartWithItems(appUserId);

    // console.log(
    //   'getCartWithCartItems-cartData-0: ',
    //   JSON.stringify(cartData, null, 2)
    // );
    if (!cartData) {
      const newCart = await this.createCart(appUserId);
      cartData = [{ ...newCart, items: [] }];
      // console.log(
      //   'getCartWithCartItems-cartData-1: ',
      //   JSON.stringify(cartData, null, 2)
      // );
    }

    if (isEmpty(cartData?.items)) {
      // console.log(
      //   'getCartWithCartItems-cartData-2: ',
      //   JSON.stringify(cartData, null, 2)
      // );
      return cartData;
    }

    // console.log(
    //   'getCartWithCartItems-cartData-3: ',
    //   JSON.stringify(cartData, null, 2)
    // );
    const cartItems = cartData?.items;
    const s3Keys = cartItems
      .map((cartItem) => cartItem.imgS3Key)
      .filter((s3Key) => s3Key != null);

    const signedUrls = await S3Service.getSignedUrls(s3Keys);

    const updatedCartItems = cartItems.map((cartItem) => ({
      ...cartItem,
      imgS3Url: cartItem.imgS3Key ? signedUrls[cartItem.imgS3Key] : null,
    }));

    // console.log('cartData:: ', cartData);
    return { ...cartData, items: updatedCartItems };
  }

  static async addItemToCart(
    appUserId: number,
    cartItemData: Partial<CartItem> | any
  ): Promise<CartWithCartItems> {
    let cart = await CartModel.findBy('appUserId', appUserId);

    if (!cart) {
      cart = await this.createCart(appUserId);
    }

    console.log('cart:', cartItemData);

    // const newCartItem = await this.createCartItem({
    //   cartId: cart.id,
    //   productId: cartItemData.productId,
    //   quantity: cartItemData.quantity,
    // });

    // const newCartItem = await CartItemModel.upsertCartItem({
    //   cartId: cart.id,
    //   // productId: cartItemData.productId,
    //   // quantity: cartItemData.quantity,
    //   cartItem: cartItemData,
    // });
    const newCartItem = await CartItemModel.upsertCartItem({
      cartId: cart.id,
      // productId: cartItemData.productId,
      // quantity: cartItemData.quantity,
      cartItem: cartItemData,
    });
    console.log('newnew', newCartItem);

    const cartWithItems: CartWithCartItems =
      await this.getCartWithCartItems(appUserId);

    return cartWithItems;
  }

  static async updateActiveCartByAppUserId(
    appUserId: number,
    cartData: Partial<Cart | null>
  ): Promise<Cart> {
    if (!cartData) {
      throw new BadRequestError('Invalid cart data provided');
    }

    const updatedCart = await CartModel.updateActiveCartByAppUserId(
      appUserId,
      cartData
    );

    if (!updatedCart) {
      throw new NotFoundError('cart not found or failed to update');
    }

    return updatedCart;
  }

  static async updateCartById(
    cartId: number,
    cartData: Partial<Cart | null>
  ): Promise<Cart> {
    if (!cartData) {
      throw new BadRequestError('Invalid cart data provided');
    }

    const updatedCart = await CartModel.updateById(cartId, cartData);

    if (!updatedCart) {
      throw new NotFoundError('cart not found or failed to update');
    }

    return updatedCart;
  }

  static async deleteCartItem(cartItemId: number): Promise<boolean> {
    const success = await CartItemModel.delete(cartItemId);

    if (!success) {
      throw new NotFoundError('Cart Item not found or deletion failed');
    }

    return success;
  }
}

export default CartService;
