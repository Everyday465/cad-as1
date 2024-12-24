import { APIGatewayProxyEvent } from 'aws-lambda';
import { getOne } from '../handler/posts/get-one';
import { deletePost } from '../handler/posts/delete';
import { putPost } from '../handler/posts/put'; // Import the PUT handler

export const handler = async (event: APIGatewayProxyEvent) => {
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allowed methods
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
      },
      body: JSON.stringify({ message: 'Missing path parameter: id' }),
    };
  }

  try {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        return await getOne({ id });
      case 'DELETE':
        return await deletePost({ id });
      case 'PUT':
        // Parse the request body for the PUT method
        const body = event.body ? JSON.parse(event.body) : null;
        if (!body) {
          return {
            statusCode: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
            },
            body: JSON.stringify({ message: 'Request body is required for PUT' }),
          };
        }
        return await putPost({ id, data: body }); 
      default:
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allowed methods
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
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allowed methods
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
      },
      body: JSON.stringify({ 
        message: error instanceof Error ? error.message : 'Internal Server Error' 
      }),
    };
  }
};
