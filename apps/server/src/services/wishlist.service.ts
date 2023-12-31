// apps/server/src/services/wishlist.service.ts

import { NotFoundError } from '../middleware/customErrors';
import { WishlistModel } from '../models/wishlist.model';

class WishlistService {
  // @ts-ignore
  // static async createWishlist(appUserId: number): Promise<Wishlist | any> {
  //   // TODO: handle case when user is not found
  //   // TODO: handle case when cart already exists
  //   const newWishlist = await WishlistModel.create(appUserId);

  //   console.log('newWishlist222', newWishlist);
  //   return newWishlist;
  // }

  static async getAllFavoritesByAppUserId(appUserId) {
    let favorites = await WishlistModel.getAllBy('appUserId', appUserId);
    console.log('SERVICE-FAVFAV', favorites);

    if (!favorites) {
      // return [];
      throw new NotFoundError(`Wishlist not found`);
    }

    // @ts-ignore
    const favoritesArray = favorites.map((fav) => fav.productId);
    return favoritesArray;
    // return favorites;
  }

  static async addProductToFavorites({
    appUserId,
    productId,
  }: {
    appUserId: number;
    productId: number;
  }): Promise<any> {
    const updatedWishlist = await WishlistModel.addWishlistItem({
      appUserId,
      productId,
    });

    if (!updatedWishlist) {
      // TODO:
    }

    return updatedWishlist.map((fav) => fav.productId);
    // return updatedWishlist;
  }

  static async deleteProductFromFavorites({
    appUserId,
    productId,
  }: {
    appUserId: number;
    productId: number;
  }): Promise<any> {
    const updatedWishlist = await WishlistModel.deleteWishlistItem({
      appUserId,
      productId,
    });

    if (!updatedWishlist) {
      // TODO:
    }

    return updatedWishlist.map((fav) => fav.productId);
    // return updatedWishlist;
  }
}

export { WishlistService };
