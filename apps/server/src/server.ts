// apps/server/src/index.ts

// require('dotenv').config();

// import dotenv from 'dotenv';
// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// dotenv.config({ path: `.env` });

import { loadEnvVariables } from './config/envLoader';
loadEnvVariables();

import 'dotenv/config';
import { app } from './app';
// import ParameterStoreService from './services/parameter-store.service';
// import { log } from 'logger';

async function startServer() {
  try {
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
