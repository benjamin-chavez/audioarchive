import { Knex } from 'knex';

const TABLE_NAME = 'cart_items';

export async function up(knex: Knex): Promise<void> {
  // return knex.schema.createTable(TABLE_NAME, (table) => {
  knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();

    // Foreign Keys
    table
      .integer('cart_id')
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

    table
      .integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .notNullable();

    table.integer('quantity').notNullable();
    // table.decimal('price', 10, 2).notNullable();

    table.timestamps(true, true);

    table.unique(['cart_id', 'product_id']);

    // table.index('appUserId');
  });

  // await knex.schema.raw(
  //   `ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT quantity_check CHECK (quantity >= 0 AND quantity <= 5)`
  // );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
