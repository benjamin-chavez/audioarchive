// packages/shared/src/schemas/customer.ts

import { z } from 'zod';

export const StripeCustomerSchema = z.object({
  id: z.number().int().positive(),
  appUserId: z.number().int().positive(),
  stripeCustomerId: z.string(),

  created_at: z.date(),
  updated_at: z.date(),
});

export type StripeCustomer = z.infer<typeof StripeCustomerSchema>;
