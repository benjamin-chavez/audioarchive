// knexfile.ts

import 'dotenv/config';
import CustomMigrationSource from './src/database/customMigrationSource';
import path from 'path';
console.log('DATABASE_HOST: ', process.env.DATABASE_USER);
console.log('DATABASE_USER: ', process.env.DATABASE_USER);
console.log('DATABASE_USER: ', process.env.DATABASE_USER);
console.log('DATABASE_USER: ', process.env.DATABASE_USER);
console.log('DATABASE_USER: ', process.env.DATABASE_USER);
console.log('DATABASE_USER: ', process.env.DATABASE_USER);
console.log('DATABASE_USER: ', process.env.DATABASE_USER);
console.log('DATABASE_USER: ', process.env.DATABASE_USER);
console.log('DATABASE_USER: ', process.env.DATABASE_USER);
console.log('DATABASE_USER: ', process.env.DATABASE_USER);
console.log('DATABASE_USER: ', process.env.DATABASE_USER);

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

const baseConfig = {
  client: 'postgresql',
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
    // stub: './src/database/migration.stub.js',
    migrationSource: new CustomMigrationSource(
      path.join(__dirname, 'migrations')
    ),
  },
  seeds: {
    directory: './src/database/seeds/development',
    // directory: './src/database/migrations',
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

const development = {
  ...baseConfig,
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
  },
};

// host:
//   process.env.USE_LOCAL_DB_TUNNEL === 'true'
//     ? 'localhost'
//     : process.env.DATABASE_HOST,
const production = {
  client: 'postgresql',
  connection: {
    host: process.env.DATABASE_HOST,
    // user: process.env.DATABASE_USER,
    user: 'postgres',
    password: 'pg-secret',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    database: 'audio_archive_production',
    ssl: { rejectUnauthorized: false },
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
    // stub: './src/database/migration.stub.js',
    migrationSource: new CustomMigrationSource(
      path.join(__dirname, 'migrations')
    ),
  },
  seeds: {
    directory: './src/database/seeds/development',
    // directory: './src/database/migrations',
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
  // ...baseConfig,
};

const knexConfig = {
  development,
  production,
};

export default knexConfig;
