// @ts-check
import path from 'path';
import express from 'express';
import webpack from 'webpack';

const app = express();
let host;
let port;

if (process.env.NODE_ENV === 'development') {
  console.log(`BACKEND - NODE_ENV: ${process.env.NODE_ENV}`);

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
} else if (process.env.NODE_ENV === 'production') {
  console.log(`BACKEND - NODE_ENV: ${process.env.NODE_ENV}`);

  // To get the variables from DefinePlugin to appear here, you must create the webpack compiler
  const config = require('../src/webpack/webpack.config.prod.babel').default;
  const compiler = webpack(config()); // eslint-disable-line

  // These are set by webpack.DefinePlugin in the webpack config.
  port = process.env.PORT;
  host = process.env.HOST;

  // Middleware still required if you want to see the prod build on the local Express server.
  // It actually builds the assets.
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true, // Only console log errors and warnings
    })
  );
} else {
  console.log(`BACKEND - Unable to detect NODE_ENV: ${process.env.NODE_ENV}`);
}

app.get('/', () => {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../dist')));
  }
  // TODO
});

app.listen(port, host, () => {
  console.log('\n\n====================================');
  console.log(`App at ${host}:${port}`);
  console.log('====================================\n');
});
