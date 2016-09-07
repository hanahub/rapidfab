var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    browsers: [ process.env.BROWSER ? process.env.BROWSER : 'Chrome'],
    captureTimeout: 60000,
    client: {
      captureConsole: false,
    },
    customLaunchers: {
      'PhantomJS2_debug': {
        base: 'PhantomJS2',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          }
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },
    frameworks: ['mocha', 'chai'],
    files: [
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      'tests/*.test.js',
      'tests/**/*.test.js',
    ],
    junitReporter : {
      outputDir: __dirname + '/test_results/',
      outputFile: 'test-results.xml',
    },
    mochaReporter: {
      showDiff: true
    },
    phantomjs2Launcher: {
      exitOnResourceError: true
    },
    preprocessors: {
      'rapidfab/**/*.js'        : ['webpack', 'sourcemap'],
      'tests/**/*.test.js'  : ['webpack', 'sourcemap'],
    },
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true // don't spam the console when running in karma
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
  });
};
