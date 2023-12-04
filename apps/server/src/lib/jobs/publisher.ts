// apps/server/src/jobs/rabbitmq.ts

import { Channel, Connection, connect } from 'amqplib';
import dotenv from 'dotenv';
import { RABBITMQ_URL } from './config';
dotenv.config();

const CONN = RABBITMQ_URL;
// const CA_CERT = Buffer.from(process.env.AWS_MQ_CA_CERT_BASE64, 'base64');

let channel: Channel | null = null;
let connection: Connection | null = null;

const initRabbitMQ = async () => {
  try {
    const sslOptions = {};

    connection = await connect(CONN, sslOptions);
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
