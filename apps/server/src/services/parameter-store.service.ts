// apps/server/src/services/parameter-store.service.ts

import {
  SSMClient,
  GetParameterCommand,
  GetParametersCommand,
  GetParametersCommandInput,
  Parameter,
} from '@aws-sdk/client-ssm';
import { SSM } from 'aws-sdk';

// const ssmClient = new SSMClient({ region: 'us-east-2' });

class ParameterStoreService {
  private static ssmClient: SSMClient;

  static initialize(region: string) {
    this.ssmClient = new SSMClient({ region });
  }

  static async getParameter(
    name: string,
    withDecyption = false
  ): Promise<string> {
    try {
      const command = new GetParameterCommand({
        Name: name,
        WithDecryption: withDecyption,
      });

      // const response = await ssmClient.send(command);
      const response = await this.ssmClient.send(command);

      return response.Parameter.Value;
    } catch (error) {
      throw error;
    }
  }

  static async getParameters(
    input: GetParametersCommandInput
  ): Promise<Parameter[]> {
    try {
      // const input = {
      //   Names: ['STRING_VALUE'],
      //   WithDecryption: true || false,
      // };

      const command = new GetParametersCommand(input);
      // const response = await ssmClient.send(command);
      const response = await this.ssmClient.send(command);

      return response.Parameters;
    } catch (error) {
      throw error;
    }
  }

  static getParameterWorker = async (
    name: string,
    decrypt: boolean
  ): Promise<string> => {
    const ssm = new SSM();
    // const ssm = new SSMClient();
    const result = await ssm
      .getParameter({ Name: name, WithDecryption: decrypt })
      .promise();
    return result.Parameter.Value;
  };

  static getParameterW = async (name: string): Promise<string> => {
    return this.getParameterWorker(name, false);
  };

  static getEncryptedParameterW = async (name: string): Promise<string> => {
    return this.getParameterWorker(name, true);
  };
}

export default ParameterStoreService;
