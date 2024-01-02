// apps/server/src/models/review.model.ts

import knex from '../config/database';

class ProductReviewModel {
  private static tableName = 'productReviews';

  static async create({
    title,
    comment,
    productId,
    appUserId,
  }: {
    title: string;
    comment: string;
    appUserId: number;
    productId: number;
  }) {
    // const results:  any[] = await knex(this.tableName)
    const results: any[] = await knex(this.tableName)
      .insert({ title, comment, productId, appUserId })
      .returning('*');

    return results[0];
  }

  // TODO: Verify that you have the return type correct
  static findBy(
    // field: keyof ProductReview,
    field: string,
    value: unknown
  ): any {
    // ): Promise<ProductReview | null> {
    return knex(this.tableName)
      .where({ [field]: value })
      .first();
  }

  static getAllByProductId(productId) {
    return knex(this.tableName).select('*').where({ productId });
  }

  static async update({
    title,
    comment,
    reviewId,
  }: {
    title: string;
    comment: string;
    reviewId: number;
  }): Promise<any> {
    // }): Promise<Review> {
    const [updatedReview] = await knex(this.tableName)
      .where({ id: reviewId })
      .update({ title, comment })
      .returning('*');

    return updatedReview;
  }

  static async delete(reviewId: number): Promise<boolean> {
    return (await knex(this.tableName).where({ id: reviewId }).del()) > 0;
  }
}

export { ProductReviewModel };
