// apps/server/src/config/aws-config.ts

import { S3Client } from '@aws-sdk/client-s3';
import { SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';
dotenv.config();

type AWSConfig = {
  region: string;
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

const awsConfig: AWSConfig = {
  region: process.env.AWS_REGION,
};

if (process.env.NODE_ENV === 'development') {
  awsConfig.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  };
}

export const sqsClient = new SQSClient(awsConfig);
export const s3 = new S3Client(awsConfig);
