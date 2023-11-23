// packages/shared/src/schemas/order.schema.ts

import { z } from 'zod';

// TODO: add status enum

export const orderSchema = z.object({
  id: z.number().int().positive(),
  appUserId: z.number().int(),
  // accountId: z.number().int(),
  stripePaymentIntentId: z.string().optional(),
  paymentStatus: z.string(),
  stripeCheckoutSessionId: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type Order = z.infer<typeof orderSchema>;
