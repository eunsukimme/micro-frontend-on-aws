import * as cdk from "aws-cdk-lib";
import { MicroFrontendStack } from "../lib/micro-frontend";

const app = new cdk.App();
new MicroFrontendStack(app, "MicroFrontendStack", {
  env: {
    region: 'ap-northeast-2',
    account: '436874380673',
  },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
