# Mobile Flows Connector
Sample Mobile Flows Connector using Serverless Architecture

This is a sample Mobile Flows Connector built using NodeJS on Amazon Web Services (AWS) Serverless Srchitecture (Lambda). 
We are using the [Serverless Framework](www.serverless.com) for developing and deploying the same to AWS Cloud.

## Prerequisites
- Node (8.6.0+)
- NPM (5.3.0+)
- An AWS account
- AWS CLI
- Serverless Framework

## Installation & Configuration
- AWS CLI
- Serverless Framework

First you need to install and configure AWS Command Line Interface (AWS CLI). 
AWS CLI is a command line tool which helps to work with AWS services using commands from your command-line shell. Please refer to https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html, to install the same.

Once done, you can use the following command on the command prompt, to see if AWS CLI is installed:</br>
`aws --version`</br>

It displays the details of aws-cli version as shown like:</br>
`aws-cli/1.16.167 Python/3.6.0 Windows/10 botocore/1.12.157`</br>

Once installed, the next step is to configure the AWS CLI with your credentials.

To configure AWS CLI installation, type `aws configure` and the AWS CLI prompts for information like access key, secret access key, AWS Region, and output format. These information will be used any time you run an AWS CLI command. For more info, please refer to  https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

Now you need to install the Serverless Framework.
The Serverless Framework helps you develop and deploy your AWS Lambda functions easily, along with the needed AWS infrastructure resources.
To install Serverless Framework run:</br>
`npm install serverless -g`</br>
The above command install serverless at the global level. And now you can create a serverless application anywhere on your system and deploy it.
 
## How to start
Clone this git repo, install all the dependencies and start building your business logic on top of it.
In this application, you used node `express` framework along with `serverless-http` npm package.

For a Mobile Flows connector you need a discovery url, card request url and action(s) end points if any.
In this sample connector, we have below end points:
- `/` - connector discovery response
- `/${constant.endPointHref}` - card request end point
- `/getMoreTweets` - card actions

If you need more end points, you can add them in similar fashions.

You can test the app locally/offline with the below command:</br>
`serverless offline`

The above command will create API endpoints which can be tested locally. 

Once testing is done in local environment, you can deploy it to AWS, by running the below command: </br>
`serverless deploy` </br>

The above comand will create a Cloud Formation stack and create all the required AWS resources, deploy the code and give the publically accessible API end points. 

