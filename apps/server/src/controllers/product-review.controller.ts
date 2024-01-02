// apps/server/src/controllers/product-review.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import MeService from '../services/me.service';
import { ProductReviewService } from '../services/product-review.service';

const CONTEXT = 'ProductReviewController';

export const createReview: RequestHandler = asyncHandler(async (req, res) => {
  const { title, comment } = req.body;
  const productId = parseInt(req.params.productId, 10);
  console.log(JSON.stringify(req.body, null, 2));
  // @ts-ignore
  const authId = req.auth.sub;

  const { id: appUserId } = await MeService.getMe(authId);

  const newReview = await ProductReviewService.createReview({
    title,
    comment,
    productId,
    appUserId,
  });

  res
    .status(201)
    .json({ data: newReview, message: 'Review created successfully' });
});

export const getAllReviewsByProductId: RequestHandler = asyncHandler(
  async (req, res) => {
    const productId = parseInt(req.params.productId, 10);

    const reviews =
      await ProductReviewService.getAllReviewsByProductId(productId);

    res.json({ data: reviews, message: 'Reviews retrieved successfully' });
  }
);

export const getReviewById: RequestHandler = asyncHandler(async (req, res) => {
  const reviewId = parseInt(req.params.reviewId, 10);

  const review = await ProductReviewService.getReviewById(reviewId);

  res.json({ data: review, message: 'Review retrieved successfully' });
});

export const updateReview: RequestHandler = asyncHandler(async (req, res) => {
  const reviewId = parseInt(req.params.reviewId, 10);

  // @ts-ignore
  const authId = req.auth.sub;
  const { id: appUserId } = await MeService.getMe(authId);
  const { title, comment } = req.body;

  const updatedReview = await ProductReviewService.updateReview({
    title,
    comment,
    reviewId,
    appUserId,
  });

  res
    .status(201)
    .json({ data: updatedReview, message: 'Review created successfully' });
});

export const deleteReview: RequestHandler = asyncHandler(async (req, res) => {
  const reviewId = parseInt(req.params.reviewId, 10);

  // @ts-ignore
  const authId = req.auth.sub;
  const { id: appUserId } = await MeService.getMe(authId);

  await ProductReviewService.deleteReview({
    appUserId,
    reviewId,
  });

  res.status(200).json({ message: 'Review successfully deleted' });
});
