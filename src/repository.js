const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = `${process.env.ENV}-Task`;

class TaskRepository {
  async list() {
    let results = await dynamodb.scan({ TableName }).promise();
    return results.Items;
  }

  async create(attributes) {
    let Item = {
      ID: uuid.v4(),
      Description: attributes.Description,
      IsDone: false
    }
    await dynamodb.put({ TableName, Item }).promise();
    return Item;
  }

  async update(id, attributes) {
    let Key = { ID: id };
    let result = await dynamodb.get({ TableName, Key }).promise();
    let task = result.Item;

    let Item = {
      ID: id,
      Description: attributes.Description || task.Description,
      IsDone: attributes.hasOwnProperty('IsDone') ? attributes.IsDone : task.IsDone
    }
    await dynamodb.put({ TableName, Item }).promise();
    return Item;
  }

  async remove(id) {
    let Key = { ID: id };
    return await dynamodb.delete({ TableName, Key }).promise();
  }
};

module.exports = TaskRepository;
