# amaysim Serverless Workshop

This workshop covers how software is being developed at amaysim. You will be building a Todo application using Serverless, Docker, and ReactJS in AWS.

## Topics

This workshop has 3 parts: Serverless, Docker and Pipelines, and JAM stack. Each of them has 2 branches: initial and a final. The goal for you is to complete each part from the initial branch and validate your solution against the final branch.

### Serverless

The back-end of the Todo app. It uses AWS, Serverless, Lambda, and NodeJS. The 2 branches are:

- serverless/initial
- serverless/final

### Immutable Software Development Life Cycle

From local development to CI/CD pipelines using Docker, Docker Compose, Make. The 2 branches are:

- immutable_sdlc/initial
- immutable_sdlc/final

### JAM Stack

Front-end of the Todo app using the JAM Stack (ReactJS, S3). The 2 branches are:

- jam/initial
- jam/final

## Prerequisites

Each part of the workshop relies on the following prerequisites:

- AWS account with admin access (including development keys)
- [assume-role](https://github.com/remind101/assume-role) if assume role is required

> Each branch will also have their own prerequisites describe in their README.

### AWS Credentials Configuration

The way AWS Credentials is configured will depend on your setup.

If `assume role` is required, you would be using the tool `assume-role` and it will set the AWS environment variables.

```bash
# Example of how to use the command where playground profile is defined in ~/.aws/config file
$ eval $(assume-role playground)
```

If `assume role` is not required to access your AWS account, make sure either your environment variables are set properly or you are using the `~/.aws` files.