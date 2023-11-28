// apps/client/src/app/api/config/route.ts

// pages/api/config.js
import AWS from 'aws-sdk';

export async function GET(req: Request) {
  const { paramName, withDecryption } = await req.json();
  try {
    const ssmClient = new AWS.SSM({
      region: 'us-east-2',
      // region: process.env.AWS_REGION,
    });

    const params = {
      Name: paramName,
      WithDecryption: withDecryption,
    };

    const res = await ssmClient.getParameter(params).promise();

    return Response.json({ res });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
