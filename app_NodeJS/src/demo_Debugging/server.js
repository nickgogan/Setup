// @flow

import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

// Use for static assets, like external data mocks.
app.use(
  '/static',
  express.static(path.join(__dirname, 'dist/assets/'))
);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
  console.log('Example app listening on port 3001!')
);

// Middleware

// Routes

// Catch 404s

// Error handlers

// Start server
