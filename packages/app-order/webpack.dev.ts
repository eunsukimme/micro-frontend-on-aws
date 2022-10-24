import HtmlWebpackPlugin from "html-webpack-plugin";
import { resolve } from "path";
import { Configuration } from "webpack";
import "webpack-dev-server";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.config";

const developmentConfig: Configuration = {
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: { index: "/index.html" },
    hot: true,
    host: "localhost",
    port: 30001,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public/index.html"),
    }),
  ],
};

export default merge(commonConfig, developmentConfig);
