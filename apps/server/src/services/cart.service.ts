// apps/server/src/services/cart.service.ts

import { Cart, CartItem, CartWithCartItems, Product } from '@shared/src';
import { BadRequestError, NotFoundError } from '../middleware/customErrors';
import CartModel from '../models/cart.model';
import CartItemModel from '../models/cart-item.model';
import S3Service from './s3.service';
import { isEmpty } from '../lib/utils';

class CartService {
  static async createCartItem(
    cartItemData: Partial<CartItem>
  ): Promise<CartItem> {
    const { cartId, productId } = cartItemData;

    if (!cartId || !productId) {
      // TODO: add Error message
      throw Error;
    }

    const newCartItem: CartItem = await CartItemModel.create(cartId, productId);

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

    if (!cartData) {
      const newCart = await this.createCart(appUserId);
      cartData = [{ ...newCart, items: [] }];
    }

    if (isEmpty(cartData[0]?.items[0].product)) {
      return cartData;
    }

    const cartItems = cartData[0].items;
    const s3Keys = cartItems
      .map((cartItem) => cartItem.product.imgS3Key)
      .filter((s3Key) => s3Key != null);

    const signedUrls = await S3Service.getSignedUrls(s3Keys);

    const updatedCartItems = cartItems.map((cartItem) => ({
      ...cartItem,
      product: {
        ...cartItem.product,
        imgS3Url: cartItem.product.imgS3Key
          ? signedUrls[cartItem.product.imgS3Key]
          : null,
      },
    }));

    return { ...cartData[0], items: updatedCartItems };
  }

  static async addItemToCart(
    appUserId: number,
    cartItemData: Partial<CartItem>
  ): Promise<CartWithCartItems> {
    let cart = await CartModel.findBy('appUserId', appUserId);

    if (!cart) {
      cart = await this.createCart(appUserId);
    }

    const newCartItem = await this.createCartItem({
      cartId: cart.id,
      productId: cartItemData.productId,
    });

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
