// apps/server/src/controllers/webhooks.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import knex from '../config/database';
// import { publishToQueue } from '../lib/jobs/publisher';
import { PublisherService } from '../lib/jobs/sqs-publisher';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createEvent: RequestHandler = asyncHandler(async (req, res) => {
  console.log('webhook request received');
  const rawBody = req.body;
  // console.log('rawBody: ', rawBody);

  let event: Stripe.Event;
  const signature = req.headers['stripe-signature'];

  try {
    event = stripe.webhooks.constructEvent(
      // @ts-ignore
      req.rawBody,
      // @ts-ignore
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    // console.log(error);
    // throw new Error('Webhook signature verification failed.');
    throw new Error(error);
  }

  const newEvent = await knex('events')
    .insert({
      // data: event,
      data: event.data,
      source: req.params.source,
      type: event.type,
      // @ts-ignore
      status: 'pending',
    })
    .returning('*');

  // await publishToQueue('webhook_queue', event);
  // await publishToQueue('webhook_queue', newEvent);
  const queueUrl = process.env.AWS_SQS_STRIPE_WEBHOOKS_QUEUE_URL;
  await PublisherService.publishToQueueFIFO(queueUrl, newEvent, 'abc');

  // TODO: write somesort of test to validate that the events are being added to the correct queue
  // TODO: Add some sort of other SNS notification or something around this if it is failing in prod

  console.log('webhooks.controller::Webhook received and queued');
  res.status(200).json({ message: 'Webhook received and queued' });
});

// curl -X POST -H "Content-Type: application/json" -d '{"this": "is a test"}' http://localhost:5000/api/webhook/testing
