// packages/shared/src/schemas/customer.schema.ts

import { z } from 'zod';

export const customerSchema = z.object({
  id: z.number().int().positive(),
  appUserId: z.number().int().positive(),
  stripeCustomerId: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type Customer = z.infer<typeof customerSchema>;
