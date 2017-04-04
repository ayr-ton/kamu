var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var PORT = 3000;

var devServerConfig = {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  }
};

function listenHandler(err, result) {
  if (err) {
    console.error(err);
  }
  console.log('Listening at localhost: %s', PORT);
};

var devServer = new WebpackDevServer(webpack(config), devServerConfig);
devServer.listen(PORT, '0.0.0.0', listenHandler);