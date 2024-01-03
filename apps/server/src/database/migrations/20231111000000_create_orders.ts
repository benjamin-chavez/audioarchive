import { Knex } from 'knex';

const TABLE_NAME = 'orders';

export async function up(knex: Knex): Promise<void> {
  // await knex.schema.raw(
  //   "CREATE TYPE orderStatusType AS ENUM ('pending', 'processing', 'completed', 'cancelled', 'refunded')"
  // );

  // await knex.schema.raw(
  //   "CREATE TYPE payment_status_type AS ENUM ('pending', 'paid', 'unpaid', 'no_payment_required')"
  // );

  return knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments('id').primary();
    t.integer('app_user_id')
      .unsigned()
      .references('id')
      .inTable('app_users')
      .notNullable();
    // t
    //   .integer('accountId')
    //   .unsigned()
    //   .references('id')
    //   .inTable('accounts')
    //   .notNullable();
    // t.string('stripe_payment_id');
    // t.string('payment_status');
    t.string('stripe_payment_intent_id');
    t.string('payment_status')
      // .specificType('status', 'orderStatusType')
      .notNullable()
      .defaultTo('pending');
    t.string('stripe_checkout_session_id');
    t.timestamps(true, true);

    t.index('id');
    t.index('stripe_payment_intent_id');
    t.index('stripe_checkout_session_id');
  });
}

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
