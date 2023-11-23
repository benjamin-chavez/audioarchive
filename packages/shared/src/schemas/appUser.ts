// packages/shared/schemas/appUser.ts

import { z } from 'zod';
import { ProductSchema } from './product.schema';

export const AppUserSchema = z.object({
  id: z.number().int().positive(),
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  // username: z.string().max(50).nullable(),
  email: z.string().email(),
  // avatar: z.string().optional(),
  avatarS3Key: z.string().optional(),
  avatarS3Url: z.string().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const AppUserWithProductsSchema = z.object({
  appUser: AppUserSchema,
  products: z.array(ProductSchema),
});

export type AppUser = z.infer<typeof AppUserSchema>;
export type AppUserWithProducts = z.infer<typeof AppUserWithProductsSchema>;
