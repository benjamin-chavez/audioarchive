// apps/server/src/config/aws-config.ts

import { S3Client } from '@aws-sdk/client-s3';
import { CreateQueueCommand, SQSClient } from '@aws-sdk/client-sqs';
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

const run = async () => {
  try {
    const params: any = {
      QueueName: 'SQS_QUEUE_NAME_URL',
      Attributes: {
        DelaySeconds: '20',
        // MessageRetentionPeriod: '',
      },
    };

    const input = {
      // CreateQueueRequest
      QueueName: 'STRING_VALUE', // required
      Attributes: {
        // QueueAttributeMap
        '<keys>': 'STRING_VALUE',
      },
      tags: {
        // TagMap
        '<keys>': 'STRING_VALUE',
      },
    };

    // @ts-ignore
    const data = await sqsClient.send(new CreateQueueCommand(params));
    console.log('success', data);
  } catch (error) {
    console.log('Error', error);
  }
};

run();
