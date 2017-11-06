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
    filename: `[name].${process.env.BUILD_VERSION}.bundle.js`,
    sourceMapFilename: "[name].js.map",
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      title: 'Rapidfab',
      cache: true,
      template: 'index.html',
      filename: `index.${process.env.BUILD_VERSION}.html`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BUILD_VERSION: JSON.stringify(
          process.env.BUILD_VERSION || 'development'
        ),
        COMMIT_HASH: JSON.stringify(process.env.COMMIT_HASH),
      },
    }),
    new SentryPlugin({
      organization: 'sentry',
      project: 'dev-rapidfab',
      apiKey: '67c4a607495a44a3aa8695834fd9bd713063bc6333a342f3b98e08e3a21ade26',
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
