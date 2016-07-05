const path            = require('path');
const webpack         = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "source-map",
  devServer: {
    hot: true,
    progress: true,
    inline: true,
    port: 3001,
  },
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3001/',
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
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?presets[]=es2015&plugins[]=transform-runtime'],
      exclude: /(node_modules|bower_components)/,
      include: path.join(__dirname, 'rapidfab')
    },
    {
      test: /\.scss$/,
      loaders: ["style", "css?sourceMap", "sass?sourceMap"],
      exclude: /(node_modules|bower_components)/,
      include: path.join(__dirname, 'rapidfab')
    }]
  },
  resolve: {
    alias: {
      rapidfab: __dirname + '/rapidfab',
      images: __dirname + '/images',
      tests:  __dirname + '/tests'
    },
    extensions: ['', '.js', '.scss', '.png', '.jpg']
  }
};
