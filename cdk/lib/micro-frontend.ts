import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";
import path from "path";
import { stackPrefix, bucketName } from "../constant";

export class MicroFrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // NOTE: mfa 애플리케이션이 호스팅 될 버킷
    const bucket = new s3.Bucket(this, `${stackPrefix}-bucket`, {
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

    // NOTE: bucket은 기본적으로 private이고, public access가 막혀있다. CF OAI를 통해 접근할 수 있도록 하자.
    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      `${stackPrefix}-cloudfront-oai`
    );
    bucket.grantRead(cloudFrontOAI);

    const lambdaEdge = new cloudfront.experimental.EdgeFunction(
      this,
      "MyFunction",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset(path.join(__dirname, "../lambda")),
      }
    );

    // NOTE: mfa 애플리케이션을 서빙할 CF distribution
    const distribution = new cloudfront.Distribution(
      this,
      `${stackPrefix}-cloudfront`,
      {
        defaultBehavior: {
          origin: new origins.S3Origin(bucket, {
            originAccessIdentity: cloudFrontOAI,
          }),
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          edgeLambdas: [
            {
              functionVersion: lambdaEdge.currentVersion,
              eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
              includeBody: true,
            },
          ],
        },
        defaultRootObject: `app-host/index.html`,
      }
    );

    // NOTE: CF distribution output
    new cdk.CfnOutput(this, `${stackPrefix}-cf-distribution-domain-name`, {
      value: distribution.distributionDomainName,
      description: "The distribution domain name of CloudFront",
    });
    new cdk.CfnOutput(this, `${stackPrefix}-cf-distribution-id`, {
      value: distribution.distributionId,
      description: "The distribution ID of CloudFront",
    });
  }
}
