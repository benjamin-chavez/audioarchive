// apps/server/src/services/rating.service.ts

import { Knex } from 'knex';
import { NotFoundError } from '../middleware/customErrors';
import { ProductRatingModel } from '../models/product-rating.model';

class ProductRatingService {
  static async createRating({
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
    // TODO: ADD VALIDATION LOGIC TO ENSURE THE USER HAS ACTUALLY PURCHASED THIS PRODUCT

    const newRating = await ProductRatingModel.create({
      rating,
      appUserId,
      productId,
      dbTransaction,
    });

    if (!newRating) {
      throw new Error('Creation failed');
    }

    return newRating;
  }

  static async getAllRatingsByProductId(productId) {
    const ratings = await ProductRatingModel.getAllByProductId(productId);

    if (!ratings) {
      throw new Error('Ratings not found');
    }

    return ratings;
  }

  static async getAverageProductRating(productId) {
    const ratings = await this.getAllRatingsByProductId(productId);

    if (!ratings) {
      throw new Error('Ratings not found');
    }

    // TODO: Make this a utility function?
    const averageRating =
      ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length;

    return averageRating;
  }

  static async getRatingById(ratingId) {
    const rating = await ProductRatingModel.findBy('id', ratingId);

    if (!rating) {
      throw new Error('Ratings not found');
    }

    return rating;
  }

  static async updateRating({
    rating,
    ratingId,
    appUserId,
    dbTransaction,
  }: {
    rating: number;
    appUserId: number;
    ratingId: number;
    dbTransaction?: Knex.Transaction;
  }) {
    // TODO: ADD VALIDATION LOGIC TO ENSURE THE USER HAS ACTUALLY PURCHASED THIS PRODUCT

    const updatedRating = await ProductRatingModel.update({
      ratingId,
      rating,
      dbTransaction,
    });

    if (!updatedRating) {
      throw new Error('Rating not found or failed to update');
    }

    return updatedRating;
  }

  static async deleteRating({
    appUserId,
    ratingId,
    dbTransaction,
  }: {
    appUserId: number;
    ratingId: number;
    dbTransaction?: Knex.Transaction;
  }) {
    // TODO: ADD VALIDATION LOGIC TO ENSURE THE USER HAS ACTUALLY PURCHASED THIS PRODUCT

    const success = await ProductRatingModel.delete(ratingId, dbTransaction);

    if (!success) {
      throw new NotFoundError('Rating not found or deletion failed');
    }

    return success;
  }
}

export { ProductRatingService };
