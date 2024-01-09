// apps/server/@types/types.d.ts

// import { Request } from 'express';
import { Account, AppUser, Product, Event, Plugin } from '@shared/src/schemas';

declare module 'express' {
  interface Request {
    appUser?: AppUser;
    product?: Product;
    account?: Account;
    event?: Event;
    plugin?: Plugin; //TODO: Review This
  }
}

// declare namespace Express {
//   export interface Request {
//     user?: User;
//   }
// }
