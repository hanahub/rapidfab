const path                  = require('path');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const webpackConfig         = require('./webpack.config');
const fs                    = require('fs');

const version = process.env.BUILD_VERSION || 'development';

console.log(version);

fs.writeFileSync(
  path.join(__dirname, "rapidfab", "version.js"),
  `module.exports = ${JSON.stringify(version)};`
);

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
    new HtmlWebpackPlugin({
      title: "Rapidfab",
      cache: true,
      template: "index.html",
      filename: "index.[hash].html"
    })
  ]
});
