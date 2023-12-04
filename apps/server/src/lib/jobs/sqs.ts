// apps/server/src/lib/jobs/sqs.ts

// ./libs/sqsClient.ts
import {
  CreateQueueCommand,
  DeleteQueueCommand,
  ListQueuesCommand,
  SQSClient,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';
dotenv.config();

const REGION = 'us-east-2';

const sqsClient = new SQSClient({ region: REGION });

// sqs_createqueue.ts
const params = {
  QueueName: 'SQS_QUEUE_NAME_URL',
  Attributes: {
    DelayedSeconds: '20',
    MessageTerentionPeriod: '',
  },
};

const run = async () => {
  try {
    const data = await sqsClient.send(new CreateQueueCommand(params));
    console.log('success', data);
  } catch (error) {
    console.log('Error', err);
  }
};

run();

// sqs_listqueues.ts
const run2 = async () => {
  try {
    const data = await sqsClient.send(new ListQueuesCommand({}));
    console.log('Success', data);

    return data; // For unit tests.
  } catch (err) {
    console.error(err, err.stack);
  }
};

run2();

// sqs_deletequeue.ts;
const params3 = { QueueUrl: 'SQS_QUEUE_URL' };
// ex: https://sqs.REGION.amazonaws.com/ACCOUNT-ID/QUEUE-NAME

const run3 = async () => {
  try {
    const data = await sqsClient.send(new DeleteQueueCommand(params3));
    console.log('success', data);

    return data;
  } catch (error) {
    console.log(error, error.stack);
  }
};

run3();

// sqs_sendmessage.ts
const params4 = {
  DelaySeconds: 10,
  MesageAttributes: {
    Title: {
      DtaaType: 'String',
      StringValue: 'The Whistler',
    },
    Author: {
      DataType: 'String',
      StringValue: 'John Grisham',
    },
    WeeksOn: {
      DataType: 'Number',
      StringValue: '6',
    },
  },
  MessageBody:
    'Information about current NY Times fiction bestseller for week of 12/11/2016.',
  MessageDeduplicationId: 'TheWhistler',
  MessageGroupId: 'Group1',
  QueueUrl: 'SQS_QUEUE_URL', // 'https://sqs.REGION.amazonaws.com/ACCOUNT-ID/QUEUE-NAME'
};

const run4 = async () => {
  try {
    const data = await sqsClient.send(new SendMessageCommand(params4));
    console.log('Success, message sent. MessageId: ', data.MessageId);

    return data;
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
