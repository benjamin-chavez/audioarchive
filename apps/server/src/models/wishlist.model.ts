// apps/server/src/models/wishlist.model.ts
import knex from '../config/database';

type Wishlist = {
  id: number;
  appUserId: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
};

class WishlistModel {
  private static tableName = 'wishlist_entries';

  // static async create(appUserId: number): Promise<Wishlist | any> {
  //   const newWishlistRows: Wishlist[] = await knex(this.tableName)
  //     .insert({ appUserId })
  //     .returning(['productId']);

  //   const newWishlist = newWishlistRows.map((row) => ({
  //     productId: row.productId,
  //   }));

  //   // return newWishlist[0];
  //   return newWishlistRows;
  // }

  static async getAllBy(
    field: keyof Wishlist,
    value: unknown
  ): Promise<Wishlist | null> {
    const favorites: Wishlist | any = await knex(this.tableName)
      .select('productId')
      .where({
        [field]: value,
      });

    return favorites || [];
  }

  static async addWishlistItem({
    appUserId,
    productId,
  }: {
    appUserId: number;
    productId: number;
  }) {
    const updatedWishlist = await knex.transaction(async (trx) => {
      await trx(this.tableName).insert({
        appUserId,
        productId,
      });

      return trx(this.tableName)
        .select('productId')
        .where({ app_user_id: appUserId });
    });

    return updatedWishlist;
  }

  static async deleteWishlistItem({
    appUserId,
    productId,
  }: {
    appUserId: number;
    productId: number;
  }) {
    const updatedWishlist = await knex.transaction(async (trx) => {
      await trx(this.tableName)
        .where({ productId: productId, appUserId: appUserId })
        .del();

      return trx(this.tableName)
        .select('productId')
        .where({ app_user_id: appUserId });
    });

    return updatedWishlist;
  }
}

export { WishlistModel };
