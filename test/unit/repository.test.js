const TaskRepository = require('../../src/repository');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const assert = require('assert');
const sinon = require('sinon');

describe('TaskRepository', () => {
  let sandbox;
  let repository;
  const taskID = '11111111-2222-3333-4444-555555555555';
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    repository = new TaskRepository();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#list', () => {
    const task = {
      ID: taskID,
      Description: 'Test!',
      IsDone: false
    };

    beforeEach(() => {
      let promise = sandbox.stub();
      sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'scan').returns({ promise });
      promise.resolves({ Items: [task] });
    });

    it('scans dynamodb for all items in task table', async () => {
      let result = await repository.list();
      assert.deepEqual(result, [task]);
    });
  });

  describe('#create', () => {
    beforeEach(() => {
      let promise = sandbox.stub();
      sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'put').returns({ promise });
      sandbox.stub(uuid, 'v4').returns(taskID);
      promise.resolves({});
    });

    it('creates new record on dynamodb', async () => {
      let result = await repository.create({ Description: 'Test' });
      assert.deepEqual(result, { ID: taskID, Description: 'Test', IsDone: false });
    });

    it('forces IsDone to be false', async () => {
      let result = await repository.create({ Description: 'Test', IsDone: true });
      assert.deepEqual(result, { ID: taskID, Description: 'Test', IsDone: false });
    });
  });

  describe('#update', () => {
    const task = {
      ID: taskID,
      Description: 'TEST',
      IsDone: false
    };
    beforeEach(() => {
      let getPromise = sandbox.stub();
      let putPromise = sandbox.stub();
      sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'get').returns({ promise: getPromise });
      sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'put').returns({ promise: putPromise });
      getPromise.resolves({ Item: task });
      putPromise.resolves({});
    });

    it('updates record on dynamodb', async () => {
      let result = await repository.update(taskID, { Description: 'test', IsDone: true });
      assert.deepEqual(result, { ID: taskID, Description: 'test', IsDone: true });
    });

    it('keeps existing attributes that do not get changed', async () => {
      let result = await repository.update(taskID, { IsDone: true });
      assert.deepEqual(result, { ID: taskID, Description: 'TEST', IsDone: true });
    });

    it('does not allow changing ID', async () => {
      let result = await repository.update(taskID, { ID: 'newID' });
      assert.deepEqual(result, task);
    });
  });

  describe('#remove', () => {
    it('removes the record', async () => {
      let promise = sandbox.stub();
      promise.resolves(null);
      sandbox.mock(AWS.DynamoDB.DocumentClient.prototype)
        .expects('delete')
        .once()
        .returns({ promise });
      assert.equal(await repository.remove(taskID), null);
    });
  });
});
