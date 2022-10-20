import { Context, CloudFrontRequestEvent } from "aws-lambda";

const handler = async (event: CloudFrontRequestEvent, context: Context) => {
  const { request } = event.Records[0].cf;
  let uri = request.uri;
  // Mfe-app1 is the app shell
  if (uri === "" || uri === "/") {
    request.uri += "/app-host/";
  }
  // Normalize uri
  if (uri.endsWith("/")) {
    request.uri += "index.html";
  }
  // Check whether the URI is missing a file extension.
  else if (!uri.includes(".")) {
    request.uri += "/index.html";
  }

  return request;
};

exports.handler = handler;
