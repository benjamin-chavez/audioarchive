// packages/shared/src/schemas/account.ts

import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.number().int().positive(),
  appUserId: z.number().int().positive(),
  stripeAccountId: z.string(),
  chargesEnabled: z.boolean(),
  payoutsEnabled: z.boolean(),
  detailsSubmitted: z.boolean(),
  defaultAccount: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Account = z.infer<typeof AccountSchema>;
