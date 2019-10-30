const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const PORT = 3000;

const options = {
  host: 'localhost',
  port: PORT,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  }
};

function listenHandler(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('WebpackDevServer listening at localhost:%s', PORT);
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const devServer = new WebpackDevServer(webpack(config), options);
devServer.listen(PORT, '0.0.0.0', listenHandler);