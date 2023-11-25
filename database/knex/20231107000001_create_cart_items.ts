import { Knex } from 'knex';

const TABLE_NAME = 'cart_items';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();

    // Foreign Keys
    table
      .integer('cartId')
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
      .integer('productId')
      .unsigned()
      .references('id')
      .inTable('products')
      .notNullable();

    // table.integer('quantity').notNullable();
    // table.decimal('price', 10, 2).notNullable();

    table.timestamps(true, true);

    // table.index('appUserId');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
