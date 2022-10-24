import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.config";

const { WEBPACK_PUBLIC_PATH } = process.env;

export const productionConfig: Configuration = {
  mode: "production",
  output: {
    clean: true,
    filename: "[contenthash].js",
    path: resolve(__dirname, "dist"),
    publicPath: WEBPACK_PUBLIC_PATH || "/",
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  devtool: "hidden-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
};

export default merge(commonConfig, productionConfig);
