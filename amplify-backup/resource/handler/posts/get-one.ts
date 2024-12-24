// ./resources/handlers/posts/get-one.ts

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = new DynamoDB({});

export async function getOne({ id }: { id: string }) {
  // Get the post from DynamoDB
  const result = await dynamodb.send(
    new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        ProductID: `POST#${id}`,
      },
    })
  );

  // If the post is not found, return a 404
  if (!result.Item) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
      },
      body: JSON.stringify({ message: 'Post not found' }),
    };
  }

  // Otherwise, return the post
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
    },
    body: JSON.stringify(result.Item),
  };
}