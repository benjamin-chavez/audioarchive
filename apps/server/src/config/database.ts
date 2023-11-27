// src/database/db.ts

import 'dotenv/config';
import knexConstructor from 'knex';
import knexConfig from '../../knexfile';
// import updateTypes from 'knex-types';

export function getKnexInstance() {
  const environment = process.env.NODE_ENV || 'development';
  // const environment = process.env.NODE_ENV || 'production';

  const config = knexConfig[environment];

  const knex = knexConstructor(config);

  // export default knex;

  return knex;
}

// export default getKnexInstance() as knex;
