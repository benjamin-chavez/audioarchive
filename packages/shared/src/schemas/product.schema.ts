// packages/shared/schemas/product.ts

import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  appUserId: z.number().int().positive(),
  accountId: z.number().int().positive(),
  name: z.string(),
  genre: z.string(),
  software: z.string(),
  bpm: z.number(),
  price: z.number(),
  artwork: z.string().optional(),
  imgS3Key: z.string().optional(),
  imgS3Url: z.string().optional(),
  digitalFileS3Key: z.string().optional(),
  digitalFileS3Url: z.string().optional(),
  key: z.string().optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  stripeProductId: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type Product = z.infer<typeof ProductSchema>;
