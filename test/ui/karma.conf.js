// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-06-30 using
// generator-karma 1.0.0
'use strict';

module.exports = function(config) {

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'wiredep',
      'jasmine'
    ],

    wiredep: {
      dependencies:true,
      devDependencies:true
    },

    coverageReporter: { type : 'lcov', dir : 'coverage/' },
    reporters: [],

    preprocessors: {
      'app/**/*.js': ['coverage'],
      'app/templates/*.html': ['html2js']
    },

    // list of files / patterns to load in the browser
    files: [
      'app/scripts/**/*.js',
      'test/ui/**/*.js',
      'app/templates/**/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-wiredep',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-html2js-preprocessor',
      'karma-notify-reporter'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
