// ./resources/handlers/posts/delete.ts

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = new DynamoDB({});

export async function deletePost({ id }: { id: string }) {
  await dynamodb.send(
    new DeleteCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        ProductID: `POST#${id}`,
      },
    })
  );

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
    },
    body: JSON.stringify({ message: 'Post deleted' }),
  };
}