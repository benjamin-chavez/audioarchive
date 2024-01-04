// apps/server/src/models/review.model.ts

import { Knex } from 'knex';
import knex from '../config/database';

class ProductReviewModel {
  private static tableName = 'productReviews';

  static async create({
    title,
    comment,
    productId,
    appUserId,
    dbTransaction,
  }: {
    title: string;
    comment: string;
    appUserId: number;
    productId: number;
    dbTransaction?: Knex.Transaction;
  }) {
    // const results:  any[] = await knex(this.tableName)
    const [newReview] = await knex(this.tableName)
      .insert({ title, comment, productId, appUserId })
      .returning('*')
      .transacting(dbTransaction);

    return newReview;
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
    return knex(this.tableName)
      .select(
        'product_reviews.*',
        knex.raw('product_ratings.rating as rating'),
        knex.raw('app_users.display_name as app_user_display_name'),
        knex.raw('app_users.avatar_s3_key as app_user_avatar_s3_key'),
        knex.raw('app_users.avatar_s3_url as app_user_avatar_s3_url')
      )
      .leftJoin('app_users', 'product_reviews.app_user_id', '=', 'app_users.id')
      .leftJoin('product_ratings', function () {
        this.on(
          'product_reviews.app_user_id',
          '=',
          'product_ratings.app_user_id'
        ).andOn(
          'product_reviews.product_id',
          '=',
          'product_ratings.product_id'
        );
      })
      .where('product_reviews.product_id', productId);
  }

  static async update({
    title,
    comment,
    reviewId,
    dbTransaction,
  }: {
    title: string;
    comment: string;
    reviewId: number;
    dbTransaction?: Knex.Transaction;
  }): Promise<any> {
    // }): Promise<Review> {
    const [updatedReview] = await knex(this.tableName)
      .where({ id: reviewId })
      .update({ title, comment })
      .returning('*')
      .transacting(dbTransaction);

    return updatedReview;
  }

  static async delete(
    reviewId: number,
    dbTransaction?: Knex.Transaction
  ): Promise<boolean> {
    return (
      (await knex(this.tableName)
        .where({ id: reviewId })
        .del()
        .transacting(dbTransaction)) > 0
    );
  }
}

export { ProductReviewModel };
