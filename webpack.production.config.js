const path                  = require('path');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const webpack               = require("webpack");
const webpackConfig         = require('./webpack.config');
const fs                    = require('fs');

module.exports = Object.assign(webpackConfig, {
  devtool: "source-map",
  entry: {
    app: './rapidfab/app'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      title: "Rapidfab",
      cache: true,
      template: "index.html",
      filename: "index.[hash].html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development'),
        "BUILD_VERSION": JSON.stringify(process.env.BUILD_VERSION || 'development')
      }
    }),
  ]
});
