// apps/server/@types/types.d.ts

// import { Request } from 'express';
import { Account, AppUser, Product, Event } from '@shared/src/schemas';

declare module 'express' {
  interface Request {
    appUser?: AppUser;
    product?: Product;
    account?: Account;
    event?: Event;
  }
}

// declare namespace Express {
//   export interface Request {
//     user?: User;
//   }
// }
