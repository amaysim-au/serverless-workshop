# Docker and Pipeline Workshop

So far, you have built a Todo application from your local environment. This is nice when you are toying by yourself but it does not play well with a team. Typically we would have a defined pipeline on a CI/CD server to do the work for us. Given our CI/CD server only runs Make, Docker and Docker Compose, this workshop is about developing a pipeline that only uses those technologies to test, build and deploy the Todo application.

## Prerequisites

- [AWS account](https://aws.amazon.com/resources/create-account/) with admin access.
- [Docker](https://docs.docker.com/engine/installation/) (_Docker on Mac/Windows is recommended if you do not use Unix_)
- [Docker Compose](https://docs.docker.com/compose/install/) (_which comes bundled with Docker on Mac/Windows_)
- Make (_which is native to Mac/Unix_)

## FAQ

- What is Docker?
- What is Docker Compose?
- What is Make?
- Why the 3 musketeers?
- .env, .env.template, .env.local

## Initial Version

The initial version of this workshop contains already workable code for you to be inspired.

### Test, Deploy, and Run

```bash
# You would need to configure 1 environment variable: ENV. For now the value would be your name.
# Create a .env file using .env.local
$ make dotenv DOTENV=.env.local
# Update the value of ENV inside .env
# Test
$ make testUnit
# Deploy
$ make deploy
# you should see something like:
#   endpoints:
#     GET - https://xyz.execute-api.ap-southeast-2.amazonaws.com/yourname/tasks
$ curl https://xyz.execute-api.ap-southeast-2.amazonaws.com/yourname/tasks
# []
# Remove the stack
$ make remove
```
> **Question**: why don't we use `npm`?

## Tasks

This section contains the tasks to complete for this workshop.

> Don't forget to test after each task!

### Packaging

So far you have been deploying to one environment only. By default, Serverless Framework creates a package out of the current directory before deployment. What if you want to deploy to more than 1 environment? It would still work but following [The Twelve-Factor App](https://12factor.net/build-release-run) this method is not recommended.

#### ACs

- create a target `build` which creates a `package.zip`
- `package.zip` should only contain the necessary code (so we always keep the package as small as possible)
- target `deploy` should only deploy if the `package.zip` is present
- configure Serverless Framework to use `package.zip`

### Production

The `package.zip` is now created and it is a big achievement. However, is the code production ready? Probably not.

#### ACs

- node modules in `package.zip` should not contain any dev dependency

### Environment Variables

You have been dealing with 1 environment variable so far. It will likely not happen in reality. Luckily, Docker and Docker Compose offers another way to handle multiple environment variables: a file.

#### ACs

- use a file `.env` to pass environment variables
- make sure the file is ignored by git
- configure Docker Compose to use the file `.env`

### .env.template

Since the file `.env` is not committed, the execution of testing, building, and deploying on the CI/CD server will likely fail. Don't believe me? Delete your `.env` file and run `$ make test`.

What to do? `.env.template` to the rescue! This file will be included in git and will look like this:

```
ENV
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_SESSION_TOKEN
AWS_REGION
```

#### ACs

- create a `.env.template` file
- make sure the file is not ignored
- create a `.env` file based of `.env.template` only if `.env` is not present (_this file should not be overwritten_)