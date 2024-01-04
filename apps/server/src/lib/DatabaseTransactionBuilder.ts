// apps/server/src/lib/DatabaseTransactionBuilder.ts

import { Knex } from 'knex';
import knex from '../config/database';

export function beginTransaction(
  callback: (trx: Knex.Transaction) => Promise<void>
): Promise<void> {
  return knex.transaction(callback);
}

// export function commitTransaction(trx: Knex.Transaction) {
//   return trx.commit();
// }

// export function rollbackTransaction(trx: Knex.Transaction) {
//   return trx.rollback();
// }
