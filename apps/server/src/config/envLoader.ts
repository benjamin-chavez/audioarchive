// apps/server/src/config/envLoader.ts

import 'dotenv/config';
import ParameterStoreService from '../services/parameter-store.service';

const isProduction = process.env.NODE_ENV === 'production';

// Load environment variables here
export async function loadEnvVariables() {
  // export async function loadConfig() {
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
      '/audioarchive/production/server/AWS_ACCESS_KEY',
      '/audioarchive/production/server/AWS_BUCKET_NAME',
      '/audioarchive/production/server/AWS_BUCKET_REGION',
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

    parameters.forEach((param) => {
      if (!param.Name || !param.Value) {
        return;
      }

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