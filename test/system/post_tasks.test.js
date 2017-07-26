const request = require('request-promise-native');
const assert = require('assert');

// https://xyz.execute-api.ap-southeast-2.amazonaws.com/<yourname>/tasks
const endpoint = process.env.TASKS_ENDPOINT;

describe('POST /tasks', () => {
  it('create a new task', async () => {
    const options = {
      method: 'POST',
      uri: endpoint,
      body: {
        Description: 'Test'
      },
      json: true
    };
    let resp = await request(options)
    assert.equal(resp.Description, 'Test');
    assert.equal(resp.IsDone, false);
  });
});
