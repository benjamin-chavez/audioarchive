import { Knex } from 'knex';

const TABLE_NAME = 'cart_items';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments('id').primary();

    // Foreign Keys
    t.integer('cart_id')
      .unsigned()
      .references('id')
      .inTable('carts')
      .notNullable()
      .onDelete('CASCADE');

    // TODO: Consider if you want to also reference the stripeAccount/Store ID
    // table
    //   .integer('stripeAccountId')
    //   .references('stripeAccounts.id')
    //   .notNullable();

    t.integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .notNullable();

    t.integer('quantity').notNullable();
    // t.decimal('price', 10, 2).notNullable();

    t.timestamps(true, true);

    t.unique(['cart_id', 'product_id']);
    t.index(['created_at']);
    // t.index('appUserId');
  });

  // await knex.schema.raw(
  //   `ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT quantity_check CHECK (quantity >= 0 AND quantity <= 5)`
  // );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
