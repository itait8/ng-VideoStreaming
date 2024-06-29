"use strict";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

export function handler(event, context, callback) {
  const client = new DynamoDBClient();
  const command = new GetItemCommand({
    TableName: "Users",
    Key: {
      id: { S: "12345" },
    },
  });

  client
    .send(command)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
