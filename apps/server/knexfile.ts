// knexfile.ts

import 'dotenv/config';

function convertCamelCaseToSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, (match, letter) => `_${letter.toLowerCase()}`);
}

const convertSnakeCaseToCamelCase = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  return Object.keys(obj).reduce((accumulator, key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
      letter.toUpperCase()
    );

    accumulator[camelCaseKey] = convertSnakeCaseToCamelCase(obj[key]);

    return accumulator;
  }, {});
};

const development = {
  client: 'postgresql',
  // connection: {
  //   // database: process.env.DEV_DB_DATABASE,
  //   database: 'audio_archive_development',
  //   // user: process.env.DEV_DB_USER,
  //   // user: 'benchavez',
  //   user: 'postgres',
  //   // password: process.env.DEV_DB_PASSWORD,
  //   password: 'postgres-secret',
  // },
  connection: {
    host: 'localhost',
    database: 'audio_archive_development',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    // ssl: { rejectUnauthorized: false },
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
    // stub: './src/database/migration.stub.js',
  },
  seeds: {
    directory: './src/database/seeds/development',
  },
  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      return result.map((row) => convertSnakeCaseToCamelCase(row));
    } else {
      return convertSnakeCaseToCamelCase(result);
    }
  },
  wrapIdentifier: (
    value,
    origImpl
    // queryContext,
  ) => {
    return origImpl(convertCamelCaseToSnakeCase(value));
  },
};

const production = {
  client: 'postgresql',
  connection: {
    host: 'audio-archive-psql-db2.cxq8xikgucfb.us-east-2.rds.amazonaws.com',
    database: 'audio_archive_production',
    user: 'postgres',
    password: 'postgres-secret',
    port: 5432,
    ssl: { rejectUnauthorized: false },
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds/development',
  },
  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      return result.map((row) => convertSnakeCaseToCamelCase(row));
    } else {
      return convertSnakeCaseToCamelCase(result);
    }
  },
  wrapIdentifier: (value, origImpl) => {
    return origImpl(convertCamelCaseToSnakeCase(value));
  },
};

const knexConfig = {
  development,
  production,
};

export default knexConfig;
