// packages/shared/src/schemas/cart.schema.ts

import { z } from 'zod';
import { cartItemSchema } from './cart-item.schema';

const CartStatusEnum = z.enum(['active', 'purchased', 'archived', 'abandoned']);

export const cartSchema = z.object({
  id: z.number().int().positive(),
  appUserId: z.number().int().positive(),
  status: CartStatusEnum,

  // lastActivityAt: z.date(),
  // reminderSent: z.boolean(),

  created_at: z.date(),
  updated_at: z.date(),
});

export const cartWithCartItemsSchema = cartSchema.extend({
  cartItems: z.array(cartItemSchema).default([]),
});

export type CartStatusEnum = z.infer<typeof CartStatusEnum>;
export type Cart = z.infer<typeof cartSchema>;
export type CartWithCartItems = z.infer<typeof cartWithCartItemsSchema>;
