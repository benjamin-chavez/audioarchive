// apps/server/src/config/aws-config.ts

import { CreateQueueCommand, SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';
dotenv.config();

const REGION = process.env.AWS_REGION;

export const sqsClient = new SQSClient({ region: REGION });

// export const s3 = new S3Client({
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//   },
//   region: process.env.AWS_REGION,
// });

// export const s3 = new S3Client({
//   // region: process.env.AWS_REGION,
//   region: 'us-east-2',
// });
