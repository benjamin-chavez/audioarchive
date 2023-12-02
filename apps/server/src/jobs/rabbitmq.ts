// apps/server/src/jobs/rabbitmq.ts
/*******************
      SENDER
*******************/
// import 'server-only';
import dotenv from 'dotenv';
dotenv.config();

// import * as amqp from 'amqplib/callback_api';
import { connect, Channel, Connection } from 'amqplib';
// import { MqClient, ListBrokersCommand } from '@aws-sdk/client-mq';

// let aws_mq_username;
// let aws_mq_password;
// let aws_mq_broker_url;
// let aws_mq_port;

// // if (process.env.NODE_ENV === 'production') {
// try {
//   aws_mq_username = process.env.AWS_MQ_USERNAME;
//   console.log('process.env.AWS_MQ_USERNAME:', process.env.AWS_MQ_USERNAME);
// } catch (error) {
//   console.log('ERROR, MISSING: process.env.AWS_MQ_USERNAME');
//   throw Error('ERROR, MISSING: process.env.AWS_MQ_USERNAME');
// }

// try {
//   aws_mq_password = process.env.AWS_MQ_PASSWORD;
// } catch (error) {
//   console.log('ERROR, MISSING: process.env.AWS_MQ_PASSWORD');
//   throw Error('ERROR, MISSING: process.env.AWS_MQ_PASSWORD');
// }
// try {
//   aws_mq_broker_url = process.env.AWS_MQ_BROKER_URL;
//   console.log('process.env.AWS_MQ_BROKER_URL:', process.env.AWS_MQ_BROKER_URL);
// } catch (error) {
//   console.log('ERROR, MISSING: process.env.AWS_MQ_BROKER_URL');
//   throw Error('ERROR, MISSING: process.env.AWS_MQ_BROKER_URL');
// }

// try {
//   aws_mq_port = process.env.AWS_MQ_PORT;
//   console.log('process.env.AWS_MQ_PORT:', process.env.AWS_MQ_PORT);
// } catch (error) {
//   console.log('ERROR, MISSING: process.env.AWS_MQ_PORT');
//   throw Error('ERROR, MISSING: process.env.AWS_MQ_PORT');
// }
// // }
// // const CONN = 'amqp://rabbitmq';
// // const CONN = 'amqp://localhost';

// // const CONN =
// //   process.env.NODE_ENV === 'production'
// //     ? `amqps://${aws_mq_username}:${aws_mq_password}@${aws_mq_broker_url}:${aws_mq_port}`
// //     : 'amqp://localhost';

const CONN = `amqps://${process.env.AWS_MQ_USERNAME}:${process.env.AWS_MQ_PASSWORD}@${process.env.AWS_MQ_BROKER_URL}:${process.env.AWS_MQ_PORT}`;
// const CONN = 'amqp://localhost';

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('RabbitMQ Connection String:', CONN);

// const CA_CERT = Buffer.from(process.env.AWS_MQ_CA_CERT_BASE64, 'base64');

let channel: Channel | null = null;
let connection: Connection | null = null;

const initRabbitMQ = async () => {
  try {
    // const sslOptions = {};

    connection = await connect(
      CONN
      // , sslOptions
    );
    channel = await connection.createChannel();

    // Ensure queue is declared with durability set to true
    await channel.assertQueue('webhook_queue', { durable: true });
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error; // TODO: retry the connection
  }
};

initRabbitMQ();

export const publishToQueue = async (queueName: string, data: any) => {
  if (channel) {
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      persistent: true,
      // messageId: uuidv4(),
      // correlationId: correlationId,
    });
  } else {
    throw new Error('Channel is not initialized.');
  }
};

// Graceful shutdown
process.on('exit', () => {
  console.log('Closing RabbitMQ Channel and Connection...');
  channel?.close();
  connection?.close();
});
