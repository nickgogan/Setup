// @ts-check
import path from 'path';
import express from 'express';
import yields from 'express-yields'; // eslint-disable-line
import fs from 'fs-extra';
import webpack from 'webpack';

const app = express();
let host; // TODO:
let port;

if (process.env.NODE_ENV === 'development') {
  console.log(`BACKEND - NODE_ENV: ${process.env.NODE_ENV}`);

  // To get the variables from DefinePlugin to appear here, you must create the webpack compiler
  const config = require('../src/webpack/webpack.config.dev.babel').default;
  const compiler = webpack(config());

  // These are set by webpack.DefinePlugin in the webpack config.
  port = process.env.PORT;
  host = process.env.HOST;

  // This middleware actually builds the output.
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true, // Only console log errors and warnings
      stats: {
        colors: true,
        version: false,
      },
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
} else if (process.env.NODE_ENV === 'production') {
  console.log(`BACKEND - NODE_ENV: ${process.env.NODE_ENV}`);

  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  console.log(`BACKEND - Unable to detect NODE_ENV: ${process.env.NODE_ENV}`);
}

// eslint-disable-next-line
app.get('/', function*(req, res) {
  const index = yield fs.readFile(path.resolve(__dirname, '../build'));
  res.send(index);
});

app.listen(port, host, () => {
  console.log('\n\n====================================');
  console.log(`App at ${host}:${port}`);
  console.log('====================================\n');
});
