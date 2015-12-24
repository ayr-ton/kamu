'use strict';

exports.config = {
  specs: ['features/*_spec.js']
};

if (process.env.SNAP_CI) {
  exports.config.chromeDriver = '/usr/local/bin/chromedriver';
  exports.config.chromeOnly = true;
} else {
  exports.config.capabilities = { browserName: 'firefox' };
  exports.config.seleniumAddress = 'http://localhost:4444/wd/hub';
}
