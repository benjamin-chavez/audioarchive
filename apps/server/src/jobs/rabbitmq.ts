// // apps/server/src/jobs/rabbitmq.ts
// /*******************
//       SENDER
// *******************/
// // import 'server-only';

// // import * as amqp from 'amqplib/callback_api';
// import { connect, Channel, Connection } from 'amqplib';
// import { MqClient, ListBrokersCommand } from '@aws-sdk/client-mq';

// const AWS_MQ_USERNAME = process.env.AWS_MQ_USERNAME;
// console.log(process.env.AWS_MQ_USERNAME);
// const AWS_MQ_PASSWORD = process.env.AWS_MQ_PASSWORD;
// const AWS_MQ_BROKER_URL = process.env.AWS_MQ_BROKER_URL;
// console.log(process.env.AWS_MQ_BROKER_URL);
// const AWS_MQ_PORT = process.env.AWS_MQ_PORT;
// console.log(process.env.AWS_MQ_PORT);

// const CONN =
//   process.env.Node_ENV === 'production'
//     ? `amqps://${AWS_MQ_USERNAME}:${AWS_MQ_PASSWORD}@${AWS_MQ_BROKER_URL}:${AWS_MQ_PORT}`
//     : 'amqp://localhost';

// // const CA_CERT = Buffer.from(process.env.AWS_MQ_CA_CERT_BASE64, 'base64');

// let channel: Channel | null = null;
// let connection: Connection | null = null;

// const initRabbitMQ = async () => {
//   try {
//     const sslOptions = {};

//     connection = await connect(CONN, sslOptions);
//     channel = await connection.createChannel();

//     // Ensure queue is declared with durability set to true
//     await channel.assertQueue('webhook_queue', { durable: true });
//   } catch (error) {
//     console.error('Failed to connect to RabbitMQ:', error);
//     throw error; // TODO: retry the connection
//   }
// };

// initRabbitMQ();

// export const publishToQueue = async (queueName: string, data: any) => {
//   if (channel) {
//     channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
//       persistent: true,
//       // messageId: uuidv4(),
//       // correlationId: correlationId,
//     });
//   } else {
//     throw new Error('Channel is not initialized.');
//   }
// };

// // Graceful shutdown
// process.on('exit', () => {
//   console.log('Closing RabbitMQ Channel and Connection...');
//   channel?.close();
//   connection?.close();
// });
