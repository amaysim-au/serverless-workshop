const handler = require('../../src/handler');
const TaskRepository = require('../../src/repository');
const assert = require('assert');
const sinon = require('sinon');

describe('handler', () => {
  let sandbox;
  const task = {
    ID: '1',
    Description: 'Test!',
    IsDone: false
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#index()', () => {
    it('returns array of tasks', async () => {
      let listFunc = sandbox.stub(TaskRepository.prototype, 'list');
      listFunc.resolves([task]);

      await handler.index('', {}, (err, resp) => {
        assert.equal(resp.statusCode, 200);
        assert.equal(resp.body, JSON.stringify([task]));
      });
    });
  });
});
