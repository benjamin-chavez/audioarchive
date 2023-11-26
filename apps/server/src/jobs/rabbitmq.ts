// apps/server/src/jobs/rabbitmq.ts

// import * as amqp from 'amqplib/callback_api';
import { connect, Channel, Connection } from 'amqplib';

const CONN = 'amqp://localhost';

let channel: Channel | null = null;
let connection: Connection | null = null;

const initRabbitMQ = async () => {
  try {
    connection = await connect(CONN);
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
