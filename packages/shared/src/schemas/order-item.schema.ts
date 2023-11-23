// packages/shared/src/schemas/order-item.schema.ts

import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.number().int().positive(),
  orderId: z.number().int().positive(),
  // stripeAccountId: z.number().int().positive(),
  productId: z.number().int().positive(),
  // quantity: z.number().int().positive(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;
