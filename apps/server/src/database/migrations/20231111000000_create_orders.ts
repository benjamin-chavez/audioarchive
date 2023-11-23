import { Knex } from 'knex';

const TABLE_NAME = 'orders';

export async function up(knex: Knex): Promise<void> {
  // await knex.schema.raw(
  //   "CREATE TYPE orderStatusType AS ENUM ('pending', 'processing', 'completed', 'cancelled', 'refunded')"
  // );

  // await knex.schema.raw(
  //   "CREATE TYPE paymentStatusType AS ENUM ('pending', 'paid', 'unpaid', 'no_payment_required')"
  // );

  return knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments('id').primary();
    t.integer('appUserId')
      .unsigned()
      .references('id')
      .inTable('appUsers')
      .notNullable();
    // t
    //   .integer('accountId')
    //   .unsigned()
    //   .references('id')
    //   .inTable('accounts')
    //   .notNullable();
    // t.string('stripe_payment_id');
    // t.string('payment_status');
    t.string('stripePaymentIntentId');
    t.string('paymentStatus')
      // .specificType('status', 'orderStatusType')
      .notNullable()
      .defaultTo('pending');
    t.string('stripeCheckoutSessionId');
    t.timestamps(true, true);

    t.index('id');
    t.index('stripePaymentIntentId');
    t.index('stripeCheckoutSessionId');
  });
}

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
