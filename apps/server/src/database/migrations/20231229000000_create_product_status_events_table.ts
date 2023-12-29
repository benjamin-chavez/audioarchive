import { Knex } from 'knex';

// const TABLE_NAME = 'product_status_history';
const TABLE_NAME = 'product_status_events';

// TODO: DO WE NEED ANY INDICIES ON THIS TABLE?

export async function up(knex: Knex): Promise<void> {
  // TODO: SEE IF THERE IS A GOOD WAY TO SET SAVE THE USER WHO TRIGGERED THE TRIGGER FUNCTION
  // REVIEW INTERPOLATION SAFETY - EVEN IF THIS IS JUST A MIGRATION

  await knex.schema.raw(`
    CREATE TABLE ${TABLE_NAME}
    (
        id          SERIAL PRIMARY KEY,
        product_id  INTEGER           NOT NULL REFERENCES products (id) ON DELETE CASCADE,
        status      productStatusType NOT NULL,
        --change_date TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
        change_date TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP,
        changed_by  INTEGER REFERENCES app_users (id),
        --remarks     TEXT,
        created_at  TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP WITH TIME ZONE    DEFAULT CURRENT_TIMESTAMP
    );
`);

  await knex.schema.raw(`
    CREATE OR REPLACE FUNCTION record_product_status_change()
        RETURNS TRIGGER AS
    $$
    BEGIN
        INSERT INTO ${TABLE_NAME}(product_id, status, change_date, changed_by)
        VALUES (NEW.id, NEW.status, NOW(), current_app_user_id());
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER trigger_product_status_change
        AFTER UPDATE OF status
        ON products
        FOR EACH ROW
    EXECUTE FUNCTION record_product_status_change();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    DROP TRIGGER IF EXISTS trigger_product_status_change ON products;
    DROP FUNCTION IF EXISTS record_product_status_change;
    DROP TABLE ${TABLE_NAME};
  `);
}

///////////

// // return knex.schema.createTable(TABLE_NAME, (table) => {
// await knex.schema.createTable(TABLE_NAME, (table) => {
//   table.increments('id').primary();

//   // Foreign Key
//   table
//     .integer('app_user_id')
//     .unsigned()
//     .references('id')
//     .inTable('app_users')
//     .notNullable()
//     .onDelete('CASCADE');

//   table
//     .integer('product_id')
//     .unsigned()
//     .references('id')
//     .inTable('products')
//     .notNullable()
//     .onDelete('CASCADE');

//   // table.timestamp('lastActivityAt');
//   // table.boolean('reminder_sent');

//   table.timestamps(true, true);
//   table.index('id');
// });

// await knex.schema.raw(`
//   CREATE UNIQUE INDEX idx_unique_active_cart
//   ON ${TABLE_NAME}(app_user_id)
//   WHERE status = 'active';
// `);
