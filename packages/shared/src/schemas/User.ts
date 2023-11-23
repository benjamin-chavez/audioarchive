// packages/shared/src/schemas/User.ts

import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int().positive(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  nickname: z.string(),
  name: z.string(),
  picture: z.string().url(),
  updated_at: z.date(),
  email: z.string().email(),
  email_verified: z.boolean(),
  sub: z.string(),
  sid: z.string(),
});

export type User = z.infer<typeof UserSchema>;
