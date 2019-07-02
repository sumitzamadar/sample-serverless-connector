# sample-serverless-connector
Sample connector template for Mobile Flows using Serverless

To create any mobile flows connector that will deployed as a lambda, you can refer to this project.
This is a sample Mobile Flows Connector built using NodeJS on AWS serverless architecture (Lambda). 
We are using the Serverless Framework[www.serverless.com] for developing and deploying the same to AWS Cloud.

#Prerequisites
1. An AWS account(free tier will also work).
2. Knowledge on NodeJs
3. AWS Cli
4. Serverless Framework

First we need to install and configure aws cli. The AWS Command Line Interface (AWS CLI) is an open source tool that enables you to interact with AWS services using commands in your command-line shell. AWS requires that all incoming requests are cryptographically signed. The AWS CLI does this for you. To check if aws cli is installed,  type aws --version on commnad prompt. If installed, it will give you some version.
Please refer to https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html, in case aws cli is not installed.
Once installed, the next step is to configure the cli with your credentials.

To configure aws cli, type =>: aws configure
and start entering your details. For more info, please refer https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

Next we need to install the serverless framwork.
The Serverless Framework helps you develop and deploy your AWS Lambda functions, along with the AWS infrastructure resources they require.
To install serveless framework run:
 => npm install serverless -g
 The above command install serverless at the global level,now you can create a serverless application anywhere on your system and deploy it.
 
 Now we are ready, lets start.
 
 Either you can clone this git repo and start build your business logic on top of it, or create a brand new serverless template.
 If you want to create a brand new  template, run
 =>serverless create --template aws-nodejs
 The above command will create a new serverless template for you and you can start configuring it.
 
 Once you have cloned this git repo, you can start editing it with your own code.
 In this application, we have a express app that we have converted to serverless using the serverless-http npm package.
 
 On this express app, you can configure your endpoints.
 Currently


