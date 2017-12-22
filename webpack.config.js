const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const host = process.env.HOST || 'rapidfab.authentise.test';
const hostname = process.env.HOSTNAME || 'https://rapidfab.authentise.test/';
const port = process.env.PORT || 443;

const devServer = {
  hot: true,
  progress: true,
  port,
  host,
};

if (port === 443) {
  devServer.https = {
    ca: fs.readFileSync('./nginx.crt'),
    cert: fs.readFileSync('./nginx.crt'),
    key: fs.readFileSync('./nginx.key'),
  };
}

module.exports = {
  devtool: 'inline-source-map',
  devServer,
  entry: {
    app: [
      `webpack-dev-server/client?${hostname}`,
      'webpack/hot/only-dev-server',
      './rapidfab/app',
    ],
  },
  externals: {
    'config': 'Config',
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: "[name].js.map",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Rapidfab',
      template: 'index.html',
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          'react-hot',
          'babel?presets[]=env&plugins[]=transform-runtime',
          'eslint-loader',
        ],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css?sourceMap', 'less?sourceMap'],
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'rapidfab'),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css-loader'],
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
      { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url-loader?mimetype=image/jpg' },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/octet-stream',
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=image/svg+xml',
      },
      { test: /\.otf$/, loader: 'file-loader?prefix=font/' },
    ],
  },
  resolve: {
    alias: {
      rapidfab: `${__dirname}/rapidfab`,
      images: `${__dirname}/rapidfab/images`,
      tests: `${__dirname}/tests`,
    },
    extensions: ['', '.js', '.jsx', '.less', '.png', '.jpg'],
  },
};
