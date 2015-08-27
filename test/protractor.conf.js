exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/features/*_spec.js']
};

if (process.env.SNAP_CI) {
  exports.config.chromeDriver = '/usr/local/bin/chromedriver';
  exports.config.chromeOnly = true;
}