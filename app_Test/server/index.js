// @ts-check

import path from 'path';
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';

const app = express();
// let host = '0.0.0.0';
const host = 'localhost';
const port = 3001;

console.log(`BACKEND - NODE_ENV: ${process.env.NODE_ENV}`);

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

app.get('/', (req, res) => {
  // app.use(express.static(path.resolve(__dirname, '../public')));
  let index = fs.readFile('./public/index.html', 'utf-8', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.listen(port, host, () => {
  console.log('\n\n====================================');
  console.log(`App at ${host}:${port}`);
  console.log('====================================\n');
});
