// packages/shared/schemas/product.ts

import { z } from 'zod';

export const PluginSchema = z.object({
  id: z.number().int().positive().optional(),
  pluginName: z.string(),
  manufacturer: z.string().optional(),
  pluginVersion: z.string().optional(),
  dawId: z.number().int().positive().optional(),
  pluginProductUrl: z.string().url().optional(),
  isApproved: z.boolean(),

  created_at: z.date(),
  updated_at: z.date(),
});

export type Plugin = z.infer<typeof PluginSchema>;
