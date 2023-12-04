// apps/server/src/index.ts

// require('dotenv').config();

// import dotenv from 'dotenv';
// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// dotenv.config({ path: `.env` });

// import { loadEnvVariables } from './config/envLoader';
// loadEnvVariables().catch((error) => {
//   console.error('Failed to start server:', error);
//   process.exit(1);
// });

import dotenv from 'dotenv';
dotenv.config();
import app from './app';
// import { startConsumer } from './lib/jobs/consumer';
import { ConsumerService } from './lib/jobs/sqs-consumer';
// import ParameterStoreService from './services/parameter-store.service';
// import { log } from 'logger';

async function startServer() {
  try {
    const port = parseInt(process.env.PORT) || 5000;

    app.listen(port, () => {
      console.log(`api running on ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

const queueUrl =
  'https://sqs.us-east-1.amazonaws.com/369579651631/audio-archive-test-queue.fifo';
const consumer = new ConsumerService(queueUrl);
consumer.startPolling(async () => {
  () => (message: any) => {
    console.log('Handling General Event:', message);
  };
});

// startConsumer().catch((err) => console.error('Consumer error:', err));
startServer();
