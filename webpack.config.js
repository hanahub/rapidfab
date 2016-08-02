const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs                = require("fs");

module.exports = {
  devtool: "dev",
  devServer: {
    hot: true,
    progress: true,
    port: 443,
    host: "rapidfab.auth.dev",
    https: {
      ca: fs.readFileSync("./nginx.crt"),
      cert: fs.readFileSync("./nginx.crt"),
      key: fs.readFileSync("./nginx.key"),
    }
  },
  entry: {
    app: [
      'webpack-dev-server/client?https://rapidfab.auth.dev/',
      'webpack/hot/only-dev-server',
      './rapidfab/app'
    ]
  },
  output: {
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Rapidfab",
      template: "index.html"
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel?presets[]=es2015&plugins[]=transform-runtime'],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'rapidfab')
      },
      {
        test: /\.less$/,
        loaders: ["style", "css?sourceMap", "less?sourceMap"],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'rapidfab')
      },
      { test: /\.png$/,                         loader: "url-loader?mimetype=image/png" },
      { test: /\.jpg$/,                         loader: "url-loader?mimetype=image/jpg" },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,     loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,     loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,     loader: "url?limit=10000&minetype=image/svg+xml" },
      { test: /\.otf$/,                         loader: "file-loader?prefix=font/" },
    ]
  },
  resolve: {
    alias: {
      rapidfab: __dirname + '/rapidfab',
      images: __dirname + '/rapidfab/images',
      tests:  __dirname + '/tests'
    },
    extensions: ['', '.js', '.less', '.png', '.jpg']
  }
};
