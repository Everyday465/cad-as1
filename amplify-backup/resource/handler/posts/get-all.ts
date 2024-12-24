// ./resources/handlers/posts/get-all.ts

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = new DynamoDB({});
//should use query
export async function getAll() {
  const result = await dynamodb.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
    },
    body: JSON.stringify(result.Items),
  };
}