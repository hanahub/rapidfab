const path                  = require('path');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const webpackConfig         = require('./webpack.config');
const fs                    = require('fs');

const version = process.env.VERSION || 'development';

fs.writeFileSync(
  path.join(__dirname, "rapidfab", "version.js"),
  `module.exports = ${JSON.stringify(process.env.VERSION)};`
);

module.exports = Object.assign(webpackConfig, {
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
