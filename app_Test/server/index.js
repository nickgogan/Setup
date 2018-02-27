// @ts-check

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import fs from 'fs-extra';
import yields from 'express-yields';

const app = express();
// let host = '0.0.0.0';
const host = 'localhost';
const port = 3001;

console.log(`BACKEND - NODE_ENV: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config.dev.babel').default;
  const compiler = webpack(config());

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true, // Only console log errors and warnings
      stats: {
        colors: true,
        version: false,
      },
    }),
  );
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  // Just have Express send out static files in prod. No need to set up Express routes here.
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

app.get('/', function*(req, res) {
  console.log('====================================');
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log('====================================');
  app.use(express.static(path.resolve(__dirname, '../public')));
});

app.listen(port, host, () => {
  console.log('\n\n====================================');
  console.log(`App at ${host}:${port}`);
  console.log('====================================\n');
});
