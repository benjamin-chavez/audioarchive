// apps/server/src/models/rating.model.ts

import { Knex } from 'knex';
import knex from '../config/database';

class ProductRatingModel {
  private static tableName = 'productRatings';

  static async create({
    rating,
    appUserId,
    productId,
    dbTransaction,
  }: {
    rating: number;
    appUserId: number;
    productId: number;
    dbTransaction?: Knex.Transaction;
  }) {
    const [newRating]: any[] = await knex(this.tableName)
      .insert({ appUserId, productId, rating })
      .returning('*')
      .transacting(dbTransaction);

    return newRating;
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
    dbTransaction,
  }: {
    ratingId: number;
    rating: number;
    dbTransaction?: Knex.Transaction;
  }): Promise<any> {
    // }): Promise<Rating> {
    const [updatedRating] = await knex(this.tableName)
      .where({ id: ratingId })
      .update({ rating })
      .returning('*')
      .transacting(dbTransaction);

    return updatedRating;
  }

  static async delete(
    ratingId: number,
    dbTransaction?: Knex.Transaction
  ): Promise<boolean> {
    return (
      (await knex(this.tableName)
        .where({ id: ratingId })
        .del()
        .transacting(dbTransaction)) > 0
    );
  }
}

export { ProductRatingModel };
