# Micro Frontend on AWS

This is a demo project for AWS Community Day 2022. This repository includes sample E-commerce application.

## Overview

There are 3 applications to be composed in order to build the E-commerce application.

- `app-host` is a React application and host container consuming remote modules from `app-order` and `app-feed`.
- `app-order` is a React application redering list of products. It is a remote container exposing React component.
- `app-feed` is Vue application redering detailed description of a product. It is remote container exposing the entire Vue app.

![Application Diagram 1](/docs/application-diagram-1-light.jpg?raw=true "Application Diagram 1")

`app-host` has 2 routes, base route(`/`) and product detail route(`/:productId`). Base route imports remote module from `app-feed` and renders product list component. Product detail route imoprts remote module from `app-order` so it renders product detail component.

When a user visits to base route, product list(`app-feed`) will be rendered. If a user clicks an item in product list, route changes to product detail page so user can see description of the product(`app-order`).

![Application Diagram 1](/docs/application-diagram-2-light.jpg?raw=true "Application Diagram 1")

By cloning this repository, you can build and deploy your own E-commerce micro frontend application on AWS. Check details on the following steps.

## Requirements

- Your AWS account and profile setting in `~/.aws/credentials` to use AWS SDK & CDK.
- Node.js and npm

## Getting Started

First of all, you need to install npm packages.

```sh
npm install
```

Then you can run the dev server of each application by running this command. This project is monorepo using npm workspace so you can run each app's command by simply adding the `-w` option.

```sh
npm run dev -w <APP_NAME>
# ex. npm run dev -w app-host
```

Now you can see the application running on localhost.

### Setting Infrastructure by AWS CDK

Before you deploy our applications, You need to set up our infrastructure on AWS. This project uses AWS CDK to manage infrastructure with Typescript code.

If it's your first time setting up infrastructure by CDK, then you need to bootstrap CDK.

```sh
npm run cdk bootstrap
```

This command makes the initial setup for our infrastructure. If it is initialized, You can run the deploy command to provision our AWS resources.

```sh
npm run cdk:deploy
```

This command first transpiles the Lambda function and provisions resources described in our CDK stack on AWS.

**NOTE**: This project uses Lambda@Edge and currently it requires to be deployed at the `us-east-1` region, you may need to bootstrap CDK in the `us-east-1` region if you are not in `us-east-1` by default. Also, AWS CDK makes an additional stack for Lambda@Edge, you need to add `--all` option in the deploy command.

Deploying by CDK can take some minutes. Take time and see what's going on in the terminal.

After deploying our stack, we can deploy our applications to the S3 bucket.

### Deploy Micro Frontend Applications

To deploy each application, you can run this command.

```sh
npm run deploy -w <APP_NAME>
# ex. npm run deploy -w app-host
```

It builds the application which is provided as an argument. Then it uploads built artifacts to the S3 bucket which is associated with CloudFront.

After deploying applications, now you can finally see micro frontend applications by entering the CloudFront distribution domain name on your browser!

**Running DEMO** 👉 https://dl120itgchg9q.cloudfront.net

Navigate to `/`, `/app-order` and `/app-feed` and see what happens :)

## Architecture Diagram

![Architecture Diagram](/docs/architecture-diagram.png?raw=true "Architecture Diagram")

## Directory Structure

This is a Simplified version of the project structure.

```sh
root/
├── cdk/
│   ├── bin/     # CDK entry point
│   ├── lambda/  # Lambda@Edge handler to normalize URL
│   └── lib/     # Stack including all AWS resources
├── cli/         # useful commands to manage workspace
├── packages/
│   ├── app-host/      # host conatiner(React)
│   ├── app-order/  # remote container(React)
│   └── app-feed/  # remote container(Vue)
├── cdk.json
├── package.json
└── tsconfig.json
```

## License

MIT
