# Mobile Flows Connector
Sample Mobile Flows Connector using Serverless Architecture

This is a sample Mobile Flows Connector built using NodeJS on Amazon Web Services (AWS) Serverless Srchitecture (Lambda). 
We are using the [Serverless Framework](www.serverless.com) for developing and deploying the same to AWS Cloud.

## Prerequisites
- An AWS account
- Knowledge on NodeJS
- AWS CLI
- Serverless Framework

## Installation
- Node (8.6.0+)
- NPM (5.3.0+)
- Any editor (preferred Visual Studio Code)
> Blog: http://blog.teamtreehouse.com/install-node-js-npm-windows

First we need to install and configure AWS Command Line Interface (AWS CLI). The AWS CLI is an open source tool that enables you to interact with AWS services using commands in your command-line shell. AWS requires that all incoming requests are cryptographically signed. The AWS CLI does this for you. To check if aws cli is installed,  type `aws --version` on commnad prompt. If installed, it will show the version like: `aws-cli/1.16.167 Python/3.6.0 Windows/10 botocore/1.12.157`. Please refer to [this guide](https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html), in case aws cli is not installed.
Once installed, the next step is to configure the cli with your credentials.

To configure aws cli, type =>: aws configure
and start entering your details. For more info, please refer https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

Next we need to install the serverless framwork.
The Serverless Framework helps you develop and deploy your AWS Lambda functions, along with the AWS infrastructure resources they require.
To install serveless framework run:</br>
 => npm install serverless -g </br>
 The above command install serverless at the global level,now you can create a serverless application anywhere on your system and deploy it.
 
 Now we are ready, lets start.
 
 Either you can clone this git repo and start build your business logic on top of it, or create a brand new serverless template.
 If you want to create a brand new  template, run </br>
 =>serverless create --template aws-nodejs </br>
 The above command will create a new serverless template for you and you can start configuring it.
 
 Once you have cloned this git repo, you can start editing it with your own code.
 In this application, we have a express app that we have converted to serverless using the serverless-http npm package.
 
 On this express app, you can configure your endpoints.
 For a mobile flows connector you need a discovery url, card request url and actions end points if any.
 In the sample connector, we have similar end points:
 1. '/' => for Discovery response
 2. '/${constant.endPointHref}' => for the end point href i.e card request.
 3. '/getMoreTweets' => for the object actions
 
 If you need more end points you can configure/add the same like these.
 
 Once you clone this app, you need to install all the dependencies. For this run </br>
 => npm install
 
 Once this is done, you can test the app locally/offline with the command </br>
 
 serverless offline
 
 On running this command you will get some endpoints that you can test locally. Once you are satisfied with the response, to deploy it on aws, you can run </br>
 
 serverless deploy
 
