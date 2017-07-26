const TaskRepository = require('../../src/repository');
const AWS = require('aws-sdk');
const assert = require('assert');
const sinon = require('sinon');

describe('TaskRepository', () => {
  let sandbox;
  let repository;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    repository = new TaskRepository();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#list', () => {
    let scanFunc;
    const task = {
      ID: '1',
      Description: 'Test!',
      IsDone: false
    };

    beforeEach(() => {
      let promise = sandbox.stub();
      scanFunc = sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'scan');
      scanFunc.returns({ promise });
      promise.resolves({ Items: [task] });
    });

    it('scan dynamodb for all items in task table', async () => {
      let result = await repository.list();
      assert.deepEqual(result, [task]);
    });
  });
});
