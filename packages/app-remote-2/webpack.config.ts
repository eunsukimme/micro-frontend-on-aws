import { resolve } from "path";
import { VueLoaderPlugin } from "vue-loader";
import { Configuration, DefinePlugin } from "webpack";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const extensions = [".js", ".jsx", ".ts", ".tsx"];

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
      {
        test: /\.vue$/,
        loader: "vue-loader",
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
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: true,
    }),
    new VueLoaderPlugin(),
  ],
};

export default config;
