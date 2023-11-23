// packages/shared/src/types/index.ts

import { AppUser, Product } from '../schemas';

export type ProductWithAppUser = AppUser & Product;
