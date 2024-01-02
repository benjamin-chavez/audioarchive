// apps/server/src/routes/product.routes.ts

import express, { Router } from 'express';
import * as productRatingController from '../controllers/product-rating.controller';
import * as productReviewController from '../controllers/product-review.controller';
import * as productController from '../controllers/product.controller';
import { checkJwt } from '../middleware/authMiddleware';
import multer from 'multer';
import { testQuery } from '../controllers/search.controller';

// TODO: separate out multer middleware?
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: 'imgFile', maxCount: 1 },
  { name: 'digitalFile', maxCount: 1 },
]);

const router: Router = express.Router();

// PRODUCT RATINGS
router.post(
  '/:productId/ratings',
  checkJwt,
  productRatingController.createRating
);
router.get(
  '/:productId/ratings',
  productRatingController.getAllRatingsByProductId
);
router.get(
  '/:productId/average-rating',
  productRatingController.getAverageProductRating
);
router.get('/ratings/:ratingId', productRatingController.getRatingById);
router.patch(
  '/ratings/:ratingId',
  checkJwt,
  productRatingController.updateRating
);
router.delete(
  '/ratings/:ratingId',
  checkJwt,
  productRatingController.deleteRating
);

// PRODUCT REVIEWS
router.post(
  '/:productId/reviews',
  checkJwt,
  productReviewController.createReview
);
router.get(
  '/:productId/reviews',
  productReviewController.getAllReviewsByProductId
);
router.get('/reviews/:reviewId', productReviewController.getReviewById);
router.patch(
  '/reviews/:reviewId',
  checkJwt,
  productReviewController.updateReview
);
router.delete(
  '/reviews/:reviewId',
  checkJwt,
  productReviewController.deleteReview
);

router.get('/', productController.getAllProductsWithUserDetails);
router.get('/:id', productController.getProductById);

router.post('/', checkJwt, upload, productController.createProduct);

router.put('/:id', checkJwt, upload, productController.updateProduct);
router.delete('/:id', checkJwt, productController.deleteProduct);

export default router;

// TODO: STARTING NOTES TODO: STARTING NOTES TODO: STARTING NOTES TODO: STARTING NOTES TODO: STARTING NOTES
// TODO: Start by handling daw file uploads
