// ./resources/endpoints/posts.ts

import { APIGatewayProxyEvent } from 'aws-lambda';
import { getAll } from '../handler/posts/get-all';
import { create } from '../handler/posts/create';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        return await getAll();
      case 'POST':
        return await create(event.body);
      default:
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
            'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
          },
          body: JSON.stringify({ message: 'Invalid HTTP method' }),
        };
    }
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
      },
      body: JSON.stringify({ message: error }),
    };
  }
};