import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { bucketName } from "../constant";

export class MicroFrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // NOTE: mfa 애플리케이션이 호스팅 될 버킷
    const bucket = new s3.Bucket(this, `aws-community-day-2022-bucket`, {
      bucketName,
      cors: [
        {
          maxAge: 3600,
          allowedHeaders: ["*"],
          allowedMethods: [s3.HttpMethods.GET],
          allowedOrigins: ["*"],
        },
      ],
      // NOTE: test 용이므로 removalPolicy를 설정해서 스택을 제거하면 버킷도 제거하도록 하자
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }
}
