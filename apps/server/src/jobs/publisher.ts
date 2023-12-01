// apps/server/src/jobs/publisher.ts

import { connect, Channel, Connection } from 'amqplib';

let aws_mq_username;
let aws_mq_password;
let aws_mq_broker_url;
let aws_mq_port;

if (process.env.NODE_ENV === 'production') {
  try {
    aws_mq_username = process.env.AWS_MQ_USERNAME;
    console.log('process.env.AWS_MQ_USERNAME:', process.env.AWS_MQ_USERNAME);
  } catch (error) {
    console.log('ERROR, MISSING: process.env.AWS_MQ_USERNAME');
  }

  try {
    aws_mq_password = process.env.AWS_MQ_PASSWORD;
  } catch (error) {
    console.log('ERROR, MISSING: process.env.AWS_MQ_PASSWORD');
  }
  try {
    aws_mq_broker_url = process.env.AWS_MQ_BROKER_URL;
    console.log(
      'process.env.AWS_MQ_BROKER_URL:',
      process.env.AWS_MQ_BROKER_URL
    );
  } catch (error) {
    console.log('ERROR, MISSING: process.env.AWS_MQ_BROKER_URL');
  }

  try {
    aws_mq_port = process.env.AWS_MQ_PORT;
    console.log('process.env.AWS_MQ_PORT:', process.env.AWS_MQ_PORT);
  } catch (error) {
    console.log('ERROR, MISSING: process.env.AWS_MQ_PORT');
  }
}
const CONN =
  process.env.Node_ENV === 'production'
    ? `amqps://${aws_mq_username}:${aws_mq_password}@${aws_mq_broker_url}:${aws_mq_port}`
    : 'amqp://localhost';

console.log('process.env.Node_ENV:', process.env.Node_ENV);
console.log('RabbitMQ Connection String:', CONN);

let channel: Channel | null = null;
let connection: Connection | null = null;

const initRabbitMQ = async () => {
  try {
    const sslOptions = {};

    connection = await connect(CONN, sslOptions);
    channel = await connection.createChannel();

    await channel.assertQueue('webhook_queue', { durable: true });
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
};

const publishToQueue = async (queueName: string, data: any) => {
  if (channel) {
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
  } else {
    throw new Error('Channel is not initialized.');
  }
};

initRabbitMQ();

// Graceful shutdown
process.on('exit', () => {
  console.log('Closing RabbitMQ Channel and Connection...');
  channel?.close();
  connection?.close();
});

export { publishToQueue };
