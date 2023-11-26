// knexfile.ts

import 'dotenv/config';
import CustomMigrationSource from './src/database/customMigrationSource';
import path from 'path';
import ParameterStoreService from './src/services/parameter-store.service';

const isProduction = process.env.NODE_ENV === 'production';

async function loadConfig() {
  if (!isProduction) {
    return;
  }

  // TODO: START HERE TODO: START HERE TODO: START HERE TODO: START HERE
  // 1) Make sure `role_policy_ecs_task_role` has the proper permissions
  // 2) Break this up into chunks of 10
  // 3) Remove Env variables from terraform task

  const paramUrls = {
    general: ['/audioarchive/config/node_env', '/audioarchive/github_token'],
    aws: [
      '/audioarchive/production/server/AWS_BUCKET_REGION',
      '/audioarchive/production/server/AWS_ACCESS_KEY',
      '/audioarchive/production/server/AWS_BUCKET_NAME',
      // '/audioarchive/production/server/AWS_BUCKET_REGION',
      '/audioarchive/production/server/AWS_SECRET_KEY',
    ],
    auth0: [
      '/audioarchive/production/server/AUTH0_AUDIENCE',
      '/audioarchive/production/server/AUTH0_BASE_URL',
      '/audioarchive/production/server/AUTH0_CLIENT_ID',
      '/audioarchive/production/server/AUTH0_CLIENT_SECRET',
      '/audioarchive/production/server/AUTH0_ISSUER_BASE_URL',
      '/audioarchive/production/server/AUTH0_SCOPE',
      '/audioarchive/production/server/AUTH0_SECRET',
      '/audioarchive/production/server/CLIENT_URL',
    ],
    database: [
      '/audioarchive/production/server/DATABASE_HOST',
      '/audioarchive/production/server/DATABASE_NAME',
      '/audioarchive/production/server/DATABASE_PASSWORD',
      '/audioarchive/production/server/DATABASE_PORT',
      '/audioarchive/production/server/DATABASE_USER',
    ],
    stripe: [
      '/audioarchive/production/server/STRIPE_PUBLISHABLE_KEY',
      '/audioarchive/production/server/STRIPE_SECRET_KEY',
      '/audioarchive/production/server/STRIPE_WEBHOOK_SECRET',
      '/audioarchive/production/server/USE_LOCAL_DB_TUNNEL',
    ],
  };

  ParameterStoreService.initialize(process.env.AWS_REGION || 'us-east-2');
  try {
    let parameters = [];

    for (const key of Object.keys(paramUrls)) {
      const res = await ParameterStoreService.getParameters({
        Names: paramUrls[key],
        WithDecryption: true,
      });

      parameters = parameters.concat(res);
    }

    // const parameters = await ParameterStoreService.getParameters({
    //   Names: [''],
    //   WithDecryption: true,
    // });

    parameters.forEach((param) => {
      console.log('here');
      // if (!param.Name || !param.Value) {
      //   return;
      // }

      console.log('param.Name: ', param.Name, 'param.Value: ', param.Value);

      const name = param.Name.split('/').pop();

      if (name) {
        process.env[name] = param.Value;
      }

      console.log(`process.env[name]: `, process.env[name]);
    });
  } catch (error) {
    console.error('Error fetching parameters:', error);
    throw error;
  }
}

loadConfig;
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);
console.log('DATABASE_HOST: ', process.env.DATABASE_HOST);

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

// const development = {
//   ...baseConfig,
//   connection: {
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     port: process.env.DATABASE_PORT,
//     database: process.env.DATABASE_NAME,
//   },
// };

// host:
//   process.env.USE_LOCAL_DB_TUNNEL === 'true'
//     ? 'localhost'
//     : process.env.DATABASE_HOST,
const production = {
  client: 'postgresql',
  connection: {
    // host: process.env.DATABASE_HOST,
    host: 'audio-archive-psql-db2.cxq8xikgucfb.us-east-2.rds.amazonaws.com',
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
  // development,
  production,
};

export default knexConfig;
