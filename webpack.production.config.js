const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SentryPlugin = require('webpack-sentry-plugin');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = Object.assign(webpackConfig, {
  devtool: 'source-map',
  entry: {
    app: './rapidfab/app',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name].${process.env.GITDESCRIBE}.bundle.js`,
    sourceMapFilename: "[name].js.map",
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      title: 'Rapidfab',
      cache: true,
      template: 'index.html',
      filename: `index.html`,
    }),
    new webpack.DefinePlugin({
      'process.env': webpackConfig.environment
    }),
    new SentryPlugin({
      baseSentryURL: 'https://sentry.authentise.com/api/0',
      organization: 'sentry',
      project: 'rapidfab',
      apiKey: 'f5223435f17b4195aea1e76f6318d7d2a057775ec1e246dd814dd77b2d7bf69b',
      release: process.env.COMMIT_HASH
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery',
    }),
  ],
});
