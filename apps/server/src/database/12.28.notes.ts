// // apps/server/src/database/12.28.notes.ts

// import { Knex } from 'knex';
// import { readFileSync } from 'fs';
// import path from 'path';

// export async function up(knex: Knex): Promise<void> {
//   const sql = readFileSync(
//     path.join(__dirname, 'path/to/your/sqlfile.sql')
//   ).toString();
//   await knex.schema.raw(sql);
// }

// export async function down(knex: Knex): Promise<void> {
//   // Your down migration logic
// }

// /////////////
// async function updateProductStatus(productId, newStatus, userId) {
//   // Set a session variable for the current user ID
//   await database.query(`SET app.current_app_user_id = $1;`, [userId]);

//   // Now update the product's status
//   await database.query(
//     `
//         UPDATE products
//         SET status = $1
//         WHERE id = $2;
//     `,
//     [newStatus, productId]
//   );

//   // Reset the session variable
//   await database.query(`RESET myapp.current_user_id;`);
// }
// ///////////////

// async function updateProductStatus(productId, newStatus, userId) {
//   // Set a session variable for the current user ID
//   await database.query(`SET myapp.current_user_id = $1;`, [userId]);

//   // Now update the product's status
//   await database.query(
//     `
//         UPDATE products
//         SET status = $1
//         WHERE id = $2;
//     `,
//     [newStatus, productId]
//   );

//   // Reset the session variable
//   await database.query(`RESET myapp.current_user_id;`);
// }
