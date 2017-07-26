# amaysim Serverless Workshop - Serverless Application

## Prerequisites

- [AWS account](https://aws.amazon.com/resources/create-account/) with admin access.
- Install [nodejs](https://nodejs.org/en/download/package-manager/) (or install via [nvm](https://github.com/creationix/nvm#installation))
- [Install yarn](https://yarnpkg.com/lang/en/docs/install/). For Mac: `$ brew install yarn`
- Install [Serverless Framework](https://serverless.com) `$ yarn install -g serverless`
- Clone this repository `$ git clone git@github.com:amaysim-au/serverless-workshop.git`
- Checkout this branch `$ git checkout serverless/initial`

## FAQ

- What is Serverless?
- What is Lambda?
- What is Serverless Framework?
- What is API Gateway?
- What is DynamoDB?
- Lambda NodeJS version and Babel

## Serverless Application

The goal of this workshop is to build a Serverless Todo application.

### Functional Requirements

> **Note:** For the purpose of this workshop, the requirements cover only the happy paths.

#### `GET /tasks`

Get a list of all tasks. It returns `200` with the result:

```json
[
  {
    "ID": "0361ee22-79b0-42d0-9604-2203c824819f",
    "Description": "Answer FAQ questions",
    "IsDone": true
  },
  {
    "ID": "3d052064-ac33-4e52-87f2-b31245771204",
    "Description": "Explain the setup",
    "IsDone": false
  }
]
```

#### `POST /tasks`

Create a new task. It accepts the following payload:

```json
{
  "Description": "Create new task",
  "IsDone": false
}
```

And returns `201` with the result:

```json
{
  "ID": "10bf898e-ba37-40e8-a967-700252732437",
  "Description": "Create new task",
  "IsDone": false
}
```

#### `PUT /tasks/id`

Modify a specific task. It accepts an ID that corresponds to a task, and a payload:

```json
{
  "Description": "Create new task",
  "IsDone": true
}
```

And returns `200` with the result:

```json
{
  "ID": "10bf898e-ba37-40e8-a967-700252732437",
  "Description": "Create new task",
  "IsDone": true
}
```

#### `DELETE /tasks/id`

Delete a specific task. It accepts an ID that corresponds to a task and returns `204`.

## Initial version

This current branch contains workable code related to the functionality `GET /tasks` for you as a source of inspiration.

### Test, Deploy, and Run

```bash
# You would need to configure 1 environment variable: ENV. For now the value would be your name.
$ export ENV=myname

# Install node modules
$ yarn install
# Test
$ yarn test
# Deploy
$ yarn deploy
# you should see something like:
#   endpoints:
#     GET - https://xyz.execute-api.ap-southeast-2.amazonaws.com/yourname/tasks
$ curl https://xyz.execute-api.ap-southeast-2.amazonaws.com/yourname/tasks
# []

# Delete the stack (any stack created with serverless should be removed with serverless)
$ yarn delete
```

### AWS Console Tour

Let's visit the AWS Console and see how everything ties together.

- CloudFormation Stack (Generated by Serverless Framework)
- API Gateway
- Lambda
- DynamoDB

## Your turn to shine!

It is now your turn to complete this amazing serverless Todo application. Build the features, test, deploy, and run!

## Useful links

- [Serverless Documentation](https://serverless.com/framework/docs/) for [AWS provider](https://serverless.com/framework/docs/providers/aws/)
- [Serverless CLI Documentation](https://serverless.com/framework/docs/providers/aws/cli-reference/)
