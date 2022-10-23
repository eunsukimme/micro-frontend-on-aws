import * as cdk from "aws-cdk-lib";
import { MicroFrontendStack } from "../lib/micro-frontend";

const app = new cdk.App();
new MicroFrontendStack(app, "MicroFrontendStack", {
  env: {
    region: "ap-northeast-2",
  },
});
