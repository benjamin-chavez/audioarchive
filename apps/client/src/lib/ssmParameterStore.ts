// apps/client/src/lib/ssmParameterStore.ts

import 'server-only';
import AWS from 'aws-sdk';

export async function getEnvVariable(parameterName: string) {
  try {
    const ssmClient = new AWS.SSM({
      // credentials: {
      //   accessKeyId: process.env.AWS_ACCESS_KEY,
      //   secretAccessKey: process.env.AWS_SECRET_KEY,
      // },
      region: 'us-east-2',
    });

    const params = {
      Name: `/audioarchive/production/server/${parameterName}`,
      WithDecryption: true,
    };

    const res = await ssmClient.getParameter(params).promise();
    // console.log(res.Parameter);
    return res.Parameter.Value;
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
