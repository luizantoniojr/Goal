// Karma configuration
var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['./index.js'],
    exclude: [],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
      'src/**/*.js': ['coverage']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  })
}
