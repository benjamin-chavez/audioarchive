// apps/server/src/routes/webhook.routes.ts

import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import { publishToQueue } from '../jobs/rabbitmq';
import * as webhooksController from '../controllers/webhooks.controller';
import { consumeFromQueue } from '../jobs/consumer-worker';
// import { consumeFromQueue } from '../jobs/consumer';
// import { publishToQueue } from '../jobs/publisher';

console.log('process.env.STRIPE_SECRET_KEY: ', process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router: Router = express.Router();

// // TODO: Review if you need this to verify signatures?
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

const CNTX = 'webhook.routes';
router.get(
  '/publish',
  asyncHandler(async (req, res) => {
    await publishToQueue('webhook_queue', {});
    res.send(`${CNTX}::Published To Queue!`);
  })
);

router.get(
  '/consume',
  asyncHandler(async (req, res) => {
    await consumeFromQueue();
    res.send(`${CNTX}::Consuming Messages...`);
  })
);

export default router;
