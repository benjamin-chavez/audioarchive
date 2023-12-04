// apps/server/src/lib/jobs/sqs-consumer.ts

// TODO: 1. Implement a dead letter queue
// TODO: 2. Implement backoff/retry logic: `promise-retry` and/or `@aws-sdk/util-retry`
// TODO: 3. Review message deletion strategy
// TODO: 4. Add external logger - winston, pino, sentry, cloudwatch + log key events in the processing lifecycle of each message for later analysis
// TODO: 5. AA - De-Duplication Logic - database record of processed messages
// TODO: 6. Track important metrics like number of messages processed, processing time per message, and number of failed processing attempts.

import {
  DeleteMessageCommand,
  DeleteMessageCommandInput,
  ReceiveMessageCommand,
  ReceiveMessageCommandInput,
  SQSClient,
  Message,
} from '@aws-sdk/client-sqs';
import { sqsClient } from '../../config/aws-config';

class ConsumerService {
  private sqsClient: SQSClient;
  private queueUrl: string;
  private activeProcessCnt: number;
  private _isPolling: boolean;
  private _isShuttingDown: boolean;

  constructor(queueUrl: string) {
    this.sqsClient = sqsClient;
    this.queueUrl = queueUrl;
    this.activeProcessCnt = 0;
    this._isPolling = false;
    this._isShuttingDown = false;
  }

  public get isPolling(): boolean {
    return this._isPolling;
  }

  public get isShuttingDown(): boolean {
    return this._isShuttingDown;
  }

  startPolling(handler: (message: Message) => Promise<void>) {
    if (!this._isPolling) {
      this._isPolling = true;
      this._isShuttingDown = false;
      this.consumeMessages(handler);
    }
  }

  async stopPolling() {
    this._isShuttingDown = true;

    console.log('Initiating graceful shutdown of Consumer...');

    while (this.activeProcessCnt > 0) {
      console.log(
        `Waiting for ${this.activeProcessCnt} active message(s) to complete processing...`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    this._isPolling = false;
    this._isShuttingDown = false;

    console.log('Message Queue Consumer has shutdown gracefylly.');
  }

  // pollMessages, processQueue
  async consumeMessages(handler: (message: Message) => Promise<void>) {
    while (this.isPolling && !this.isShuttingDown) {
      try {
        const messages = await this.receiveMessages();

        for (const message of messages) {
          await this.processMessage(message);
        }
      } catch (error) {
        console.error('Error in message consumption loop:', error);
        // TODO: Handle Logging and Retry Logic
        // Implement back-off or retry logic as needed
        // Optionally, break or stop polling based on error severity
      }
    }

    this._isPolling = false;
  }

  async processMessage(message: Message) {
    this.activeProcessCnt += 1;

    try {
      const body = JSON.parse(message.Body);

      // TODO: ADD ACTUAL HANDLER LOGIC
      await generalEventHandler.handleEvent(body);
      await this.deleteMessage(message);

      return message.ReceiptHandle;
    } catch (error) {
      console.error('Error processing mesage: ', error);
    } finally {
      this.activeProcessCnt -= 1;
    }
  }

  async receiveMessages(): Promise<Message[]> {
    const params: ReceiveMessageCommandInput = {
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
      // VisibilityTimeout: 60,
    };

    try {
      const { Messages } = await this.sqsClient.send(
        new ReceiveMessageCommand(params)
      );

      return Messages || [];
    } catch (error) {
      console.error('Error receiving messages from SQS: ', error);

      return [];
    }
  }

  async deleteMessage(message: Message) {
    const messageParams: DeleteMessageCommandInput = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: message.ReceiptHandle,
    };

    try {
      await this.sqsClient.send(new DeleteMessageCommand(messageParams));
    } catch (error) {
      console.error('Error deleting message from SQS: ', error);
    }
  }
}

export { ConsumerService };
