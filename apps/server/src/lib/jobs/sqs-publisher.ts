// apps/server/src/lib/jobs/sqs-publisher.ts

// TODO: 1. Error Propagation: Ensure that errors are properly propagated back to the caller.
// TODO: 2. Implement retry logic
// TODO: 3. AA - Add Validator

import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqsClient } from '../../config/aws-config';
import { v4 as uuidv4 } from 'uuid';

class PublisherService {
  private static uniqPublisherId = uuidv4();

  static async publishToQueue(queueUrl: string, data) {
    if (!queueUrl || !data) {
      throw new Error('Queue URL and data are required');
    }

    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(data),
    };

    try {
      const res = await sqsClient.send(new SendMessageCommand(params));

      return { success: true, data: res };
    } catch (error) {
      console.error('Error sending message to SQS: ', error);

      return { success: false, data: error };
    }
  }

  static async publishToQueueFIFO(
    queueUrl: string,
    data: unknown,
    groupId: string
  ) {
    if (!queueUrl || !data || !groupId) {
      throw new Error('Queue URL, data, and group ID are required');
    }

    // TODO: validate the queueUrl is a fifo queue
    if (queueUrl.split('.').pop() !== 'fifo') {
      throw Error('Error: Queue Url is not a FIFO Queue');
    }

    console.log('publishToQueueFIFO: params passed validation');

    // const deduplicationId = `${groupId}-${this.uniqPublisherId}-${Date.now()}`;
    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(data),
      MessageGroupId: groupId,
      // MessageDeduplicationId: deduplicationId,
    };

    try {
      const res = await sqsClient.send(new SendMessageCommand(params));

      return { success: true, data: res };
    } catch (error) {
      console.error('Error sending message to SQS: ', error);

      return { success: false, data: error };
    }
  }
}

export { PublisherService };
