// apps/server/src/controllers/product-rating.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import MeService from '../services/me.service';
import { ProductRatingService } from '../services/product-rating.service';

const CONTEXT = 'ProductRatingController';

export const createRating: RequestHandler = asyncHandler(async (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  const rating = req.body.rating;
  // @ts-ignore
  const authId = req.auth.sub;

  // const { id: appUserId } = await MeService.getMe(authId);

  const newRating = await ProductRatingService.createRating({
    appUserId: 5,
    productId,
    rating,
  });

  res
    .status(201)
    .json({ data: newRating, message: 'Rating created successfully' });
});

export const getAllRatingsByProductId: RequestHandler = asyncHandler(
  async (req, res) => {
    const productId = parseInt(req.params.productId, 10);

    const ratings =
      await ProductRatingService.getAllRatingsByProductId(productId);

    res.json({ data: ratings, message: 'Ratings retrieved successfully' });
  }
);

export const getAverageProductRating: RequestHandler = asyncHandler(
  async (req, res) => {
    const productId = parseInt(req.params.productId, 10);

    const averageRating =
      await ProductRatingService.getAverageProductRating(productId);

    res.json({
      data: averageRating,
      message: 'Average Rating retrieved successfully',
    });
  }
);

export const getRatingById: RequestHandler = asyncHandler(async (req, res) => {
  const ratingId = parseInt(req.params.ratingId, 10);

  const rating = await ProductRatingService.getRatingById(ratingId);

  res.json({ data: rating, message: 'Rating retrieved successfully' });
});

export const updateRating: RequestHandler = asyncHandler(async (req, res) => {
  const ratingId = parseInt(req.params.ratingId, 10);

  // @ts-ignore
  const authId = req.auth.sub;
  const { id: appUserId } = await MeService.getMe(authId);
  const rating = req.body.rating;

  const updatedRating = await ProductRatingService.updateRating({
    appUserId,
    ratingId,
    rating,
  });

  res
    .status(201)
    .json({ data: updatedRating, message: 'Rating created successfully' });
});

export const deleteRating: RequestHandler = asyncHandler(async (req, res) => {
  const ratingId = parseInt(req.params.ratingId, 10);

  // @ts-ignore
  const authId = req.auth.sub;
  const { id: appUserId } = await MeService.getMe(authId);

  await ProductRatingService.deleteRating({
    appUserId,
    ratingId,
  });

  res.status(200).json({ message: 'Rating successfully deleted' });
});
