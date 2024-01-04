// apps/server/src/controllers/product-rating.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import MeService from '../services/me.service';
import { ProductFeedbackService } from '../services/product-feedback.service';

const CONTEXT = 'ProductFeedbackController';

// console.log(
//   `${CONTEXT} -- `,
//   'title: ',
//   title,
//   'comment: ',
//   comment,
//   'rating: ',
//   rating,
//   'productId: ',
//   productId,
//   'appUserId: ',
//   appUserId
// );

export const createReviewAndRating: RequestHandler = asyncHandler(
  async (req, res) => {
    // @ts-ignore
    const authId = req.auth.sub;
    const { title, comment, rating } = req.body;
    const productId = parseInt(req.params.productId, 10);
    const { id: appUserId } = await MeService.getMe(authId);

    // TODO: ADD MORE VALIDATION
    if (!productId || !appUserId) {
      res.status(400).send({ message: 'Product ID and User ID are required.' });
      return;
    }

    try {
      const newFeedback = await ProductFeedbackService.createReviewAndRating({
        title,
        comment,
        rating,
        productId,
        appUserId,
      });

      res.status(201).json({
        data: newFeedback,
        message: 'Feedback submitted successfully.',
      });
    } catch (error) {
      console.error('Error submitting product feedback:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

export const updateReviewAndRating: RequestHandler = asyncHandler(
  async (req, res) => {
    // @ts-ignore
    const authId = req.auth.sub;
    const { title, comment, rating, ratingId, reviewId } = req.body;
    const productId = parseInt(req.params.productId, 10);

    console.log('rating', rating);
    // TODO:: UNDO THIS!!!
    const { id: appUserId } = await MeService.getMe(authId);
    console.log('appUserId', appUserId);
    // const appUserId = 16;

    // TODO: ADD MORE VALIDATION
    if ((!ratingId && !reviewId) || !appUserId) {
      res.status(400).send({ message: 'Product ID and User ID are required.' });
      return;
    }

    try {
      const newFeedback = await ProductFeedbackService.updateReviewAndRating({
        title,
        comment,
        rating,
        ratingId,
        reviewId,
        appUserId,
        productId,
      });

      res.status(200).json({
        data: newFeedback,
        message: 'Feedback submitted successfully.',
      });
    } catch (error) {
      console.error('Error submitting product feedback:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

export const deleteReviewAndRating: RequestHandler = asyncHandler(
  async (req, res) => {
    // @ts-ignore
    const authId = req.auth.sub;
    const { ratingId, reviewId } = req.body;
    const productId = parseInt(req.params.productId, 10);
    const { id: appUserId } = await MeService.getMe(authId);

    // TODO: ADD MORE VALIDATION
    if ((!ratingId && !reviewId) || !appUserId) {
      res.status(400).send({ message: 'Product ID and User ID are required.' });
      return;
    }

    try {
      const newFeedback = await ProductFeedbackService.deleteReviewAndRating({
        ratingId,
        reviewId,
        appUserId,
      });

      res.status(200).json({
        data: newFeedback,
        message: 'Feedback successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting product feedback:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);
