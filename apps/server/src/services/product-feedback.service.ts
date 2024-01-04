// apps/server/src/services/product-feedback.service.ts

import { beginTransaction } from '../lib/DatabaseTransactionBuilder';
import { ProductRatingService } from './product-rating.service';
import { ProductReviewService } from './product-review.service';

const CONTEXT = 'ProductFeedbackService::';

class ProductFeedbackService {
  static async createReviewAndRating({
    title,
    comment,
    rating,
    productId,
    appUserId,
  }: {
    title?: string;
    comment?: string;
    rating?: number;
    productId: number;
    appUserId: number;
  }) {
    const newFeedback = {};

    await beginTransaction(async (trx) => {
      try {
        if (rating) {
          const newRating = await ProductRatingService.createRating({
            rating,
            productId,
            appUserId,
            dbTransaction: trx,
          });

          newFeedback['newRating'] = newRating;
        }

        if (comment) {
          const newReview = await ProductReviewService.createReview({
            title,
            comment,
            productId,
            appUserId,
            dbTransaction: trx,
          });

          newFeedback['newReview'] = newReview;
        }
      } catch (error) {
        console.error('Error creating product feedback:', error);
        throw error;
      }
    });

    return newFeedback;
    // return { success: true, message: 'Feedback created successfully.' };
  }

  static async updateReviewAndRating({
    title,
    comment,
    rating,
    ratingId,
    reviewId,
    appUserId,
    productId,
  }: {
    title?: string;
    comment?: string;
    rating?: number;
    ratingId?: number;
    reviewId?: number;
    appUserId: number;
    productId: number;
  }) {
    const updatedFeedback = {};

    await beginTransaction(async (trx) => {
      try {
        if (rating && !ratingId) {
          console.log('rating && !ratingId');
          console.log('HERE', rating, productId, appUserId);
          const newRating = await ProductRatingService.createRating({
            rating,
            productId,
            appUserId,
            dbTransaction: trx,
          });

          updatedFeedback['newRating'] = newRating;
        } else if (rating) {
          console.log('else rating');
          const updatedRating = await ProductRatingService.updateRating({
            rating,
            ratingId,
            appUserId,
            dbTransaction: trx,
          });

          updatedFeedback['updatedRating'] = updatedRating;
        }

        if (comment && !reviewId) {
          console.log('if (comment && !reviewId) {');
          const newReview = await ProductReviewService.createReview({
            title,
            comment,
            productId,
            appUserId,
            dbTransaction: trx,
          });

          updatedFeedback['newReview'] = newReview;
        } else if (comment) {
          console.log('else comment');
          const updatedReview = await ProductReviewService.updateReview({
            title,
            comment,
            reviewId,
            appUserId,
            dbTransaction: trx,
          });

          updatedFeedback['updatedReview'] = updatedReview;
        }
      } catch (error) {
        console.error('Error updating product feedback:', error);
        throw error;
      }
    });

    return updatedFeedback;
    // return { success: true, message: 'Feedback created successfully.' };
  }

  static async deleteReviewAndRating({
    ratingId,
    reviewId,
    appUserId,
  }: {
    ratingId?: number;
    reviewId?: number;
    appUserId: number;
  }) {
    const deletedFeedback = {};

    await beginTransaction(async (trx) => {
      try {
        if (ratingId) {
          const deletedRating = await ProductRatingService.deleteRating({
            appUserId,
            ratingId,
            dbTransaction: trx,
          });

          deletedFeedback['deletedRating'] = deletedRating;
        }

        if (reviewId) {
          const deletedReview = await ProductReviewService.deleteReview({
            appUserId,
            reviewId,
            dbTransaction: trx,
          });

          deletedFeedback['deletedReview'] = deletedReview;
        }
      } catch (error) {
        console.error('Error updating product feedback:', error);
        throw error;
      }
    });

    return deletedFeedback;
    // return { success: true, message: 'Feedback created successfully.' };
  }
}

export { ProductFeedbackService };
