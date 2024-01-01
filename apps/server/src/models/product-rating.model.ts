// apps/server/src/models/rating.model.ts

import knex from '../config/database';

class ProductRatingModel {
  private static tableName = 'productRatings';

  static async create({
    appUserId,
    productId,
    rating,
  }: {
    appUserId: number;
    productId: number;
    rating: number;
  }) {
    // const results:  any[] = await knex(this.tableName)
    const results: any[] = await knex(this.tableName)
      .insert({ appUserId, productId, rating })
      .returning('*');

    return results[0];
  }

  // TODO: Verify that you have the return type correct
  static findBy(
    // field: keyof ProductRating,
    field: string,
    value: unknown
  ): any {
    // ): Promise<ProductRating | null> {
    return knex(this.tableName)
      .where({ [field]: value })
      .first();
  }

  static getAllByProductId(productId) {
    return knex(this.tableName).select('*').where({ productId });
  }

  static async update({
    ratingId,
    rating,
  }: {
    ratingId: number;
    rating: number;
  }): Promise<any> {
    // }): Promise<Rating> {
    const [updatedRating] = await knex(this.tableName)
      .where({ id: ratingId })
      .update({ rating })
      .returning('*');

    return updatedRating;
  }

  static async delete(ratingId: number): Promise<boolean> {
    return (await knex(this.tableName).where({ id: ratingId }).del()) > 0;
  }
}

export { ProductRatingModel };
