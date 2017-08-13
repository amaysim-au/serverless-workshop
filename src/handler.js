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
  },

  async create(event, context, callback) {
    let logger = requestLogger(context);
    let repository = new TaskRepository();

    try {
      let body = JSON.parse(event.body);
      logger.info({ body });

      let task = await repository.create(body);
      logger.info({ response: task });

      return callback(null, jsonResponse(201, task));
    } catch(err) {
      logger.error(err);
      return callback(err);
    }
  },

  async update(event, context, callback) {
    let logger = requestLogger(context);
    let repository = new TaskRepository();

    try {
      let id = event.pathParameters.id;
      let body = JSON.parse(event.body);
      logger.info({ id, body });

      let task = await repository.update(id, body);
      logger.info({ response: task });

      return callback(null, jsonResponse(200, task));
    } catch(err) {
      logger.error(err);
      return callback(err);
    }
  },

  async remove(event, context, callback) {
    let logger = requestLogger(context);
    let repository = new TaskRepository();
    let id = event.pathParameters.id;
    logger.info({ id });

    try {
      await repository.remove(id);
      return callback(null, jsonResponse(204, null));
    } catch(err) {
      logger.error(err);
      return callback(err);
    }
  }
};
