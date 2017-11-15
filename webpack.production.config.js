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
      baseSentryURL: 'https://sentry.authentise.com/api/0',
      organization: 'sentry',
      project: process.env.NODE_ENV === 'production' ? 'prod-rapidfab' : 'dev-rapidfab',
      apiKey: 'dcc7578cf56a46dd802b8bd3d38419089c4c0ce601914bb7b05ea825afc9087e',
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
