// apps/server/src/services/review.service.ts

import { NotFoundError } from '../middleware/customErrors';
import { ProductReviewModel } from '../models/product-review.model';

class ProductReviewService {
  static async createReview({
    title,
    comment,
    productId,
    appUserId,
  }: {
    title: string;
    comment: string;
    productId: number;
    appUserId: number;
  }) {
    // TODO: ADD VALIDATION LOGIC TO ENSURE THE USER HAS ACTUALLY PURCHASED THIS PRODUCT

    const newReview = await ProductReviewModel.create({
      title,
      comment,
      productId,
      appUserId,
    });

    if (!newReview) {
      throw new Error('Creation failed');
    }

    return newReview;
  }

  static async getAllReviewsByProductId(productId) {
    const reviews = await ProductReviewModel.getAllByProductId(productId);

    if (!reviews) {
      throw new Error('Reviews not found');
    }

    return reviews;
  }

  static async getReviewById(reviewId) {
    const review = await ProductReviewModel.findBy('id', reviewId);

    if (!review) {
      throw new Error('Reviews not found');
    }

    return review;
  }

  static async updateReview({
    title,
    comment,
    reviewId,
    appUserId,
  }: {
    title: string;
    comment: string;
    reviewId: number;
    appUserId: number;
  }) {
    // TODO: ADD VALIDATION LOGIC TO ENSURE THE USER HAS ACTUALLY PURCHASED THIS PRODUCT

    const updatedReview = await ProductReviewModel.update({
      title,
      comment,
      reviewId,
    });

    if (!updatedReview) {
      throw new Error('Review not found or failed to update');
    }

    return updatedReview;
  }

  static async deleteReview({
    appUserId,
    reviewId,
  }: {
    appUserId: number;
    reviewId: number;
  }) {
    // TODO: ADD VALIDATION LOGIC TO ENSURE THE USER HAS ACTUALLY PURCHASED THIS PRODUCT

    const success = await ProductReviewModel.delete(reviewId);

    if (!success) {
      throw new NotFoundError('Review not found or deletion failed');
    }

    return success;
  }
}

export { ProductReviewService };
