// apps/server/src/controllers/webhooks.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import knex from '../config/database';
// import { publishToQueue } from '../lib/jobs/publisher';
import { PublisherService } from '../lib/jobs/sqs-publisher';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createEvent: RequestHandler = asyncHandler(async (req, res) => {
  console.log('WEBHOOK REQUEST RECEIVED');
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
  const queueUrl =
    'https://sqs.us-east-2.amazonaws.com/369579651631/audio-archive-test-queue.fifo';
  await PublisherService.publishToQueueFIFO(queueUrl, newEvent, 'abc');

  res.status(200).json({ message: 'Webhook received and queued' });
});

// curl -X POST -H "Content-Type: application/json" -d '{"this": "is a test"}' http://localhost:5000/api/webhook/testing
