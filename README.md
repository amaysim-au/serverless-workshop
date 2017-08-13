# Docker and Pipeline Workshop

So far, you have built a Todo application from your local environment. This is nice when you are toying by yourself but it does not play well with a team. Typically we would have a defined pipeline on a CI/CD server to do the work for us. Given our CI/CD server only runs Make, Docker and Docker Compose, this workshop is about developing a pipeline that only uses those technologies to test, build and deploy the Todo application.

## Prerequisites

- [AWS account](https://aws.amazon.com/resources/create-account/) with admin access.
- [Docker](https://docs.docker.com/engine/installation/) (_Docker on Mac/Windows is recommended if you do not use Unix_)
- [Docker Compose](https://docs.docker.com/compose/install/) (_which comes bundled with Docker on Mac/Windows_)
- Make (_which is native to Mac/Unix_)
- [assume-role](https://github.com/remind101/assume-role)

## Explore

- What is Docker?
- What is Docker Compose?
- What is Make?
- Why the [3 musketeers](https://confluence.amaysim.net/display/ENG/Immutable+SDLC+-+The+Three+Musketeers)?
- .env, .env.template, .env.local
- `$ make testUnit` vs `$ make _testUnit`
- `$ make shell`
- Why don't we use `yarn`?

## Initial Version

The initial version of this workshop contains already workable code for you to be inspired.

### Test, Deploy, and Run

```bash
# Use assume-role tool to access AWS
$ eval $(assume-role playground)
# Create a .env file using .env.local
$ make dotenv DOTENV=.env.local
# Update the value of ENV inside .env with your firstnamelastname

# Test
$ make testUnit
# Deploy
$ make deploy
# you should see something like:
#   endpoints:
#     GET - https://xyz.execute-api.ap-southeast-2.amazonaws.com/firstnamelastname/tasks
$ curl https://xyz.execute-api.ap-southeast-2.amazonaws.com/firstnamelastname/tasks
# []
# Remove the stack
$ make remove
```

## Tasks

This section contains the tasks to complete for this workshop.

> Don't forget to test after each task!

### Packaging

So far you have been deploying to one environment only. By default, Serverless Framework creates a package out of the current directory before deployment. What if you want to deploy to more than 1 environment? It would still work but following [The Twelve-Factor App](https://12factor.net/build-release-run) this method is not recommended.

Also go to AWS console and download the package of 1 of the lambdas and look what is inside. There are a lot of files that are not useful for the lambda. Even the `.env` file is there. This file could include sensitive data you may not want to upload to AWS.

> Serverless includes options to packaging. This workshop focuses on artifact because it is very useful to know when using other languages like Golang. Also creating a `package.zip` offers you more control.

#### ACs

- create a target `build` which creates a `package.zip`
- `package.zip` should only contain the necessary code (so we always keep the package as small as possible)
- target `deploy` should only deploy if the `package.zip` is present
- configure Serverless Framework to use `package.zip`

### Production

The `package.zip` is now created and it is a big achievement. However, is the code production ready? Probably not.

#### ACs

- node modules in `package.zip` should not contain any dev dependency