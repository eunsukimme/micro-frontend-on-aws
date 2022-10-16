import { resolve } from "path";
import { Configuration, DefinePlugin, container } from "webpack";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const extensions = [".js", ".jsx", ".ts", ".tsx"];

const config: Configuration = {
  entry: resolve(__dirname, "main.ts"),
  output: {
    path: resolve(__dirname, "dist"),
  },
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
        appRemote1: "appRemote1@http://localhost:3001/remoteEntry.js",
      },
    }),
  ],
};

export default config;
