import { Context, CloudFrontRequestEvent } from "aws-lambda";

const handler = async (event: CloudFrontRequestEvent, context: Context) => {
  const { request } = event.Records[0].cf;
  let uri = request.uri;
  // NOTE: 아래 로직은 module federation의 경우 유용한 URL normalization
  // NOTE: uri가 빈 스트링이거나 '/' 로 끝나면 host container(app-host)로 보낸다.
  if (uri === "" || uri === "/") {
    request.uri += "/app-host/";
  }

  // References: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html
  // NOTE: 아래 로직은 SPA의 경우 유용한 URL normalization
  // NOTE: '/'로 끝나는 uri 뒤에 index.html 을 붙여서 html을 서빙할 수 있도록 한다.
  if (uri.endsWith("/")) {
    request.uri += "index.html";
  }
  // NOTE: 마지막으로 file extension이 없다면 fallback으로 index.html을 서빙하도록 한다.
  else if (!uri.includes(".")) {
    request.uri += "/index.html";
  }

  return request;
};

exports.handler = handler;
