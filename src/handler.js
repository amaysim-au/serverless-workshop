'use strict';

const bunyan = require('bunyan');
const TaskRepository = require('./repository');

const name = 'serverless-workshop';
const env = process.env.ENV;
const requestLogger = (context) => {
  return bunyan.createLogger({
    name,
    env,
    context: {
      name: context.functionName,
      requestID: context.awsRequestId
    }
  });
};

const headers = {
  'Content-Type': 'application/json',
};
const jsonResponse = (statusCode, body) => {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
};

module.exports = {
  async index(event, context, callback) {
    let logger = requestLogger(context);
    let repository = new TaskRepository();

    try {
      let tasks = await repository.list();
      return callback(null, jsonResponse(200, tasks));
    } catch(err) {
      logger.error(err);
      return callback(err);
    }
  }
};
