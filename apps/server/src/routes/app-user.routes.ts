// apps/server/src/routes/app-user.routes.ts

import express, { Router } from 'express';
import * as appUserController from '../controllers/appUserController';
import * as meController from '../controllers/me.controller';
import * as accountsController from '../controllers/accounts.controller';
import * as cartController from '../controllers/cart.controller';
import * as cartItemController from '../controllers/cart-item.controller';
import * as orderController from '../controllers/order.controller';
import { checkJwt } from '../middleware/authMiddleware';
import multer from 'multer';

const router: Router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: 'imgFile', maxCount: 1 },
]);

router.get('/profiles', appUserController.getAllAppUsers);
// router.post('/register', upload, appUserController.createAppUser);
router.post('/register', appUserController.createAppUser);

// `GET /api/:username/profile`(Public)
// router.get('/profiles/:username', appUserController.getAppUserByUsername);
// router.get('/profiles/:username/products', appUserController.getAppUserWithProducts);

router.get('/u/:username/products', appUserController.getAppUserWithProducts);
router.get('/u/:username', appUserController.getAppUserByUsername);

router.get('/me/products/:productId', checkJwt, meController.getMyProductById);
router.get('/me/products', checkJwt, meController.getMeWithProducts);

// TODO: START HERE TODO: START HERE TODO: START HERE TODO: START HERE TODO: START HERE
//  TODO: I THINK THIS MIGHT NEED TO BE HANDLED IN /api/webhook INSTEAD
router.post('/me/accounts', checkJwt, accountsController.createStripeAccount);
router.get('/me/accounts', checkJwt, meController.getMeWithStripeAccounts);

// router.post('/me/cart', checkJwt, cartController.createMyCart); // **Unused-Keep?
router.get('/me/cart', checkJwt, cartItemController.getMyCartWithCartItems); // - Retrieve the current user's cart and its cartItems
router.put('/me/cart', checkJwt, cartController.updateMyCart); // - update the status of the cart

router.post('/me/cart/items', checkJwt, cartItemController.addItemToCart); // - Add a product to the cart.
// router.get('/me/cart/items', checkJwt, cartItemController.getCartItems);
// router.put(
//   '/me/cart/items/:itemId',
//   checkJwt,
//   cartItemController.updateCartItem
// ); // - Update the quantity of a product in the cart.
router.delete(
  '/me/cart/items/:cartItemId',
  checkJwt,
  cartItemController.deleteCartItem
); // - Remove a product from the cart.

// POST   /cart/checkout    - Checkout items in the cart.
router.post('/me/cart/checkout', checkJwt, orderController.createCheckout);

router.get('/me', checkJwt, meController.getMe);
router.put('/me', checkJwt, upload, meController.updateMe);
router.delete('/me', checkJwt, meController.deleteMe);

// Routes with parameterized paths should come after specific string routes
// TODO: Need to add admin routes or special admin read/write privileges
// router.post('/', appUserController.createAppUser);
// router.delete('/:username', appUserController.deleteAppUserById);

export default router;
