// @flow

const express = require('express');
const path = require('path');

console.log('server-side');
const app = express();
const port = 3001;

app.use(
  '/static',
  express.static(path.join(__dirname, 'dist/assets/'))
);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
  console.log('Example app listening on port 3001!')
);
