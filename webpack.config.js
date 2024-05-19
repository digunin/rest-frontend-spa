const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: isDev ? "[name].[contenthash].js" : "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ca]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      publicDir: path.join("", path.sep),
      template: "public/index.html",
      title: "Тестовое задание",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
  devtool: "source-map",
  devServer: {
    port: 5500,
  },
};
