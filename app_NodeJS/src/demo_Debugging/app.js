// @flow

import http from 'http';
import express from 'express';

const port = process.env.PORT || 3001;

// Express middleware setup
const app = express();

app.use((req, res, next) => {
  res.status(200).json({
    message: 'Middleware works!'
  });
});

// HTTP server setup
const server = http.createServer(app);
server.listen(port);
