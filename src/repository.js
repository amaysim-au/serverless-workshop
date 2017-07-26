const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = `${process.env.ENV}-Task`;

class TaskRepository {
  async list() {
    let results = await dynamodb.scan({ TableName }).promise();
    return results.Items;
  }
};

module.exports = TaskRepository;
