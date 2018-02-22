// @ts-check

import express from 'express';
import yields from 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';

const app = express();
let host;
let port;

if (process.env.NODE_ENV === 'development') {
  const config = require('../src/webpack/webpack.config.dev.babel').default;
  const compiler = webpack(config());

  // These are set by webpack.DefinePlugin in the webpack config.
  port = process.env.PORT;
  host = process.env.HOST;

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true, // Only console log errors and warnings
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
      },
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));
}

/* eslint-disable func-names */
app.get(['/',], function*(req, res) {
  // Path is from POV of the project's root.
  const index = yield fs.readFile('./public/index.html', 'utf-8');
  res.send(index);
});

// Use '0.0.0.0' instead of 'localhost' - it's nicer for mobile testing
app.listen(port, host, () => {
  console.info(`App at ${host}:${port}`);
});
