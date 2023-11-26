// apps/server/src/index.ts

// require('dotenv').config();

// import dotenv from 'dotenv';
// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// dotenv.config({ path: `.env` });

import 'dotenv/config';
import { app } from './app';
import ParameterStoreService from './services/parameter-store.service';
// import { log } from 'logger';

const isProduction = process.env.NODE_ENV === 'production';

async function loadConfig() {
  if (!isProduction) {
    return;
  }

  ParameterStoreService.initialize(process.env.AWS_REGION || 'us-east-2');
  try {
    const parameters = await ParameterStoreService.getParameters({
      Names: [
        '/audioarchive/config/node_env',
        '/audioarchive/github_token',
        '/audioarchive/production/server/AUTH0_AUDIENCE',
        '/audioarchive/production/server/AUTH0_BASE_URL',
        '/audioarchive/production/server/AUTH0_CLIENT_ID',
        '/audioarchive/production/server/AUTH0_CLIENT_SECRET',
        '/audioarchive/production/server/AUTH0_ISSUER_BASE_URL',
        '/audioarchive/production/server/AUTH0_SCOPE',
        '/audioarchive/production/server/AUTH0_SECRET',
        '/audioarchive/production/server/AWS_ACCESS_KEY',
        '/audioarchive/production/server/AWS_BUCKET_NAME',
        '/audioarchive/production/server/AWS_BUCKET_REGION',
        '/audioarchive/production/server/AWS_SECRET_KEY',
        '/audioarchive/production/server/CLIENT_URL',
        '/audioarchive/production/server/DATABASE_HOST',
        '/audioarchive/production/server/DATABASE_NAME',
        '/audioarchive/production/server/DATABASE_PASSWORD',
        '/audioarchive/production/server/DATABASE_PORT',
        '/audioarchive/production/server/DATABASE_USER',
        '/audioarchive/production/server/STRIPE_PUBLISHABLE_KEY',
        '/audioarchive/production/server/STRIPE_SECRET_KEY',
        '/audioarchive/production/server/STRIPE_WEBHOOK_SECRET',
        '/audioarchive/production/server/USE_LOCAL_DB_TUNNEL',
      ],
      WithDecryption: true,
    });

    parameters.forEach((param) => {
      if (!param.Name || !param.Value) {
        return;
      }

      const name = param.Name.split('/').pop();

      if (name) {
        process.env[name] = param.Value;
      }
    });
  } catch (error) {
    console.error('Error fetching parameters:', error);
    throw error;
  }
}

async function startServer() {
  try {
    await loadConfig();
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`api running on ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
