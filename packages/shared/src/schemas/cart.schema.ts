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

/////////
// export type ApiCartItem = {
//   cartItemId: number;
//   quantity: number;
//   productId: number;
//   name: string;
//   genre: string;
//   daw: string;
//   bpm: number;
//   price: number;
//   imgS3Key: string;
//   sellerId: number;
//   sellerUsername: string;
// };

// export type ApiCartData = {
//   cartId: number;
//   appUserId?: number;
//   items: ApiCartItem[];
// };



// export  type getCartResponse = {
//   data: ApiCartData;
//   message: string;
// };

export type getCartResponse = {
  data: {
    cartId: number;
    appUserId?: number;
    items: {
      cartItemId: number;
      quantity: number;
      productId: number;
      name: string;
      genre: string;
      daw: string;
      bpm: number;
      price: number;
      imgS3Key: string;
      sellerId: number;
      sellerUsername: string;
    }[];
  };
  message: string;
};
