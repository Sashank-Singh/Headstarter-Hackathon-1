import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const REGION = "us-east-2";

const dynamoDB = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

export const addItemToDynamoDB = async (id, inputText, inputFilePath) => {
  const timestamp = new Date().toISOString();
  const params = {
    TableName: "fovus-dynamo-table",
    Item: {
      id: { S: id },
      input_text: { S: inputText },
      input_file_path: { S: inputFilePath },
      timestamp: { S: timestamp },
    },
  };

  try {
    await dynamoDB.send(new PutItemCommand(params));
    console.log("Item added to DynamoDB");
  } catch (error) {
    console.error("Error adding item to DynamoDB:", error);
    throw error;
  }
};
