import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const putPost = async ({ id, data }: { id: string; data: any }) => {
    const params = {
        TableName: process.env.TABLE_NAME as string, // Ensure it's a string
        Key: {
          ProductID: { S: id },
        },
        UpdateExpression: "SET #itemName = :itemName, #description = :description, #status = :status, #foundLostBy = :foundLostBy",
        ExpressionAttributeNames: {
          "#itemName": "itemName",
          "#description": "description",
          "#status": "status",
          "#foundLostBy": "foundLostBy",
        },
        ExpressionAttributeValues: {
          ":itemName": { S: data.itemName },
          ":description": { S: data.description },
          ":status": { S: data.status },
          ":foundLostBy": { S: data.foundLostBy },
        },
        // Ensure ReturnValues is a valid option from the ReturnValue type
        ReturnValues: "ALL_NEW" as const, // 'ALL_NEW' is a valid value for ReturnValues
      };
      
      const command = new UpdateItemCommand(params);

    try {
        const result = await client.send(command);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
            },
            body: JSON.stringify({
                message: "Post updated successfully",
                updatedPost: result.Attributes,
            }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
            },
            body: JSON.stringify({ message: "Failed to update post" }),
        };
    }
};
