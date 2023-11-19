// apps/server/src/routes/webhook.routes.ts

import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import { publishToQueue } from '../jobs/rabbitmq';
import * as webhooksController from '../controllers/webhooks.controller';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router: Router = express.Router();

// TODO: Review if you need this to verify signatures?
// router.use(
//   express.json({
//     // We need the raw body to verify webhook signatures.
//     // Let's compute it only when hitting the Stripe webhook endpoint.
//     verify: function (req, res, buf) {
//       // if (req.originalUrl.startsWith('/webhook')) {
//       // @ts-ignore
//       req.rawBody = buf.toString();
//       // }
//     },
//   })
// );

// router.get('/stripe', <type>Controller.<method>)

// curl -X POST -H "Content-Type: application/json" -d '{"event": "user_signup", "userId": "12345"}' http://localhost:5000/api/webhook
router.post('/:source', webhooksController.createEvent);

export default router;
