import path from "path";
import { spawn } from "child_process";
import { promises as fs, createReadStream } from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import S3 from "aws-sdk/clients/s3";
import { lookup } from "mime-types";
import isImmutableFile from "./utils/isImmutableFile";
import { bucketName } from "../cdk/constant";

const s3 = new S3();

const main = async () => {
  try {
    const { app } = await yargs(hideBin(process.argv)).argv;
    const appPath = path.join(__dirname, `../packages/${app}`);
    // NOTE: argument로 주어진 app이 있는지 검사
    await fs.access(appPath);

    // NOTE: build해서 dist를 만듣다.
    const buildProcess = spawn("npm", ["run", "build"], { stdio: "inherit" });
    await new Promise((resolve) => buildProcess.on("close", resolve));

    // NOTE: dist 에 있는 파일들을 읽는다.
    const appDistPath = path.join(appPath, "dist");
    const artifacts = await fs.readdir(appDistPath);

    // NOTE: 파일들을 S3 버킷에 업로드한다.
    for (const file of artifacts) {
      const filePath = path.resolve(appDistPath, file);
      const contentType = lookup(filePath) || "application/octet-stream";
      // NOTE: immutable resource는 캐시 가능하도록 하고, 그렇지 않은 파일들의 경우 캐시되지 않고 항상 validate하도록 한다.
      const cacheControl = isImmutableFile(file)
        ? `public, max-age=86400`
        : "no-cache";

      await s3
        .putObject({
          Body: createReadStream(filePath),
          Bucket: bucketName,
          ContentType: contentType,
          Key: `${app}/${file}`,
          CacheControl: cacheControl,
        })
        .promise();
      console.log(`${file} was uploaded successfully.`);
    }
  } catch (error) {
    console.error(error);
  }
};

main();
