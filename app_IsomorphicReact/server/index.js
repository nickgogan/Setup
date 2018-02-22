// @ts-check

import express from 'express';
import yields from 'express-yields'; // eslint-disable-line
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
  let index = '';
  if (process.env.NODE_ENV === 'production') {
    // Path is from POV of the project's root.
    index = yield fs.readFile('./dist/index.html', 'utf-8');
  } else if (
    process.env.NODE_ENV === 'development' &&
    process.env.BUILD_DEV === true
  ) {
    // Path is from POV of the project's root.
    index = yield fs.readFile('./build/index.html', 'utf-8');
  } else {
    console.log('====================================');
    console.log(`Unable to detect NODE_ENV - ${process.env.NODE_ENV}`);
    console.log('====================================');
  }
  res.send(index);
});

app.listen(port, host, () => {
  console.info(`App at ${host}:${port}`);
});
