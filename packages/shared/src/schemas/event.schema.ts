// packages/shared/src/schemas/account.ts

import { z } from 'zod';

const EventStatusEnum = z.enum([
  'pending',
  'processing',
  'processed',
  'failed',
]);

export const EventSchema = z.object({
  id: z.number().int().positive(),
  data: z.any(),
  source: z.string(),
  type: z.string(),
  processing_errors: z.string(),
  status: EventStatusEnum,

  created_at: z.date(),
  updated_at: z.date(),
});

export type EventStatusType = z.infer<typeof EventStatusEnum>;
export type Event = z.infer<typeof EventSchema>;
