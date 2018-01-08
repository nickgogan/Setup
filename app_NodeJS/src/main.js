// @flow

const express = require('express');
const path = require('path');

console.log('server-side');
const app = express();
const port = 3001;

// Use for static assets, like external data mocks.
app.use(
  '/static',
  express.static(path.join(__dirname, 'dist/assets/'))
);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
  console.log(`\nExample app listening on port ${port}\n`)
);
