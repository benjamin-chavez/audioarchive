// apps/server/src/jobs/config.ts

export const AWS_MQ_USERNAME = process.env.AWS_MQ_USERNAME;
export const AWS_MQ_PASSWORD = process.env.AWS_MQ_PASSWORD;
export const AWS_MQ_BROKER_URL = process.env.AWS_MQ_BROKER_URL;
export const AWS_MQ_PORT = process.env.AWS_MQ_PORT || '5672';

let RABBITMQ_URL;

if (process.env.NODE_ENV === 'production') {
  if (
    !AWS_MQ_USERNAME ||
    !AWS_MQ_PASSWORD ||
    !AWS_MQ_BROKER_URL ||
    !AWS_MQ_PORT
  ) {
    throw new Error(
      'Missing required environment variables for AWS MQ configuration'
    );
  }

  RABBITMQ_URL = `amqp://${AWS_MQ_USERNAME}:${AWS_MQ_PASSWORD}@${AWS_MQ_BROKER_URL}:${AWS_MQ_PORT}`;
} else {
  RABBITMQ_URL = process.env.RABBITMQ_URL;
}

if (!RABBITMQ_URL) {
  throw new Error('RABBITMQ_URL is not defined');
}

export { RABBITMQ_URL };
