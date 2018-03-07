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
      baseSentryURL: 'https://sentry.io/api/0',
      organization: 'authentise',
      project: 'rapidfab',
      apiKey: '49da9cbff5754c0791fda6a2917c75194d2143a991cb4c46a0a3d7347b696e03',
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
