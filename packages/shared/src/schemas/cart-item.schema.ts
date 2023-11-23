// packages/shared/src/schemas/cart-items.ts

import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.number().int().positive(),
  cartId: z.number().int().positive(),
  // stripeAccountId: z.number().int().positive(),
  productId: z.number().int().positive(),
  // quantity: z.number().int().positive(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
