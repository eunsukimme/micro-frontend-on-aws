import { resolve } from "path";
import { Configuration, DefinePlugin, container } from "webpack";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const extensions = [".js", ".jsx", ".ts", ".tsx"];
import { dependencies } from "./package.json";
import { MicroFrontendStack } from "../../cdk-outputs.json";

const distributionURL = MicroFrontendStack.awscommunityday2022cloudfrontoutput;

const getRemoteEntry = (appName: string, port?: number) => {
  if (process.env.NODE_ENV === "production") {
    return `https://${distributionURL}/${appName}/remoteEntry.js`;
  }
  return `http://localhost:${port}/remoteEntry.js`;
};

const config: Configuration = {
  entry: resolve(__dirname, "main.ts"),
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        type: "asset/resource",
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrcRoots: [".", "../../../*"],
        },
      },
    ],
  },
  resolve: {
    extensions,
    plugins: [
      new TsconfigPathsPlugin({
        extensions,
      }),
    ],
  },
  plugins: [
    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new container.ModuleFederationPlugin({
      name: "appHost",
      remotes: {
        appRemote1: `appRemote1@${getRemoteEntry("app-remote-1", 30001)}`,
        appRemote2: `appRemote2@${getRemoteEntry("app-remote-2", 30002)}`,
      },
      shared: {
        react: { singleton: true, requiredVersion: dependencies["react"] },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ],
};

export default config;
