// apps/server/src/routes/product.routes.ts

import express, { Router } from 'express';
import * as productController from '../controllers/product.controller';
import { checkJwt } from '../middleware/authMiddleware';
import multer from 'multer';

// TODO: separate out multer middleware?
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: 'imgFile', maxCount: 1 },
  { name: 'digitalFile', maxCount: 1 },
]);

const router: Router = express.Router();

router.get('/', productController.getAllProductsWithUserDetails);
router.get('/:id', productController.getProductById);

router.post('/', checkJwt, upload, productController.createProduct);

router.put('/:id', checkJwt, upload, productController.updateProduct);
router.delete('/:id', checkJwt, productController.deleteProduct);

export default router;

// TODO: STARTING NOTES TODO: STARTING NOTES TODO: STARTING NOTES TODO: STARTING NOTES TODO: STARTING NOTES
// TODO: Start by handling daw file uploads
