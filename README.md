## AWS Amplify Todo application

This repository contains a Todo application implementation from a starter template for creating applications using Angular.js and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.

## Overview

With this template we have Angular.js application integrated with AWS Amplify, streamlined for scalability and performance. 
It integrates: 
1. Angular: The Todo application UI is built using Angular version 17. It uses aws-amplify/ui-angular package which is distributed as a part of Amplify UI package. It supports cloud-connected workflows like Authenticator, primitive components and data bound components.
2. AWS Amplify Hosting:  We use Amplify as a fully managed service for deploying and hosting our Todo application. We also use its built in CI/CD workflow that connect with code repo on github.
3. AWS Amplify (Gen 2): I use amplify to connect to DynamoDB, S3 and Lambda functions. It empowers front-end developers to develop end-2-end application by providing an abstraction layer that takes care of data model, business logic and authorization rules and stitches all the cloud services. The code written is in Typescript.
4. DynamoDB: It is used to hold the user data i.e. the Todo. The data is modelled to handle user specific todos. We use @aws-amplify/backend package with Data library powered by AWS AppSync, GraphQL APIs and DynamoDB. Developer just need to write schema to turn it into a fully functioning data backend. 
5. Cognito: It is used to manage the user pool within Todo application. Users can register via email address to use the application. The entire sign-in workflow is driven by Amplify’s Authenticator UI component. In Todo application it is integrated via @aws-amplify/backend package.
6. S3: We leverage S3 to store the profile picture of the user. 
7. Lambda: For our use case we simply listen to storage event after the profile picture is updated.   We can leverage lamda function for maybe image compression/detecting obscene image after upload is done.


## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/angular/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.


## License

This library is licensed under the MIT-0 License. See the LICENSE file.