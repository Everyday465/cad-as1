// ./resources/handlers/posts/create.ts

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import { IPost } from '../../../types';

const dynamodb = new DynamoDB({});

export async function create(body: string | null) {
  const uuid = randomUUID();

  // If no body, return an error
  if (!body) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
      },
      body: JSON.stringify({ message: 'Missing body' }),
    };
  }

  // Parse the body
  const bodyParsed = JSON.parse(body) as IPost;

  // Creat the post
  await dynamodb.send(
    new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        ProductID: `POST#${uuid}`,
        ...bodyParsed,
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
    body: JSON.stringify({ message: 'Post created' }),
  };
}