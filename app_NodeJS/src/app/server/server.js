// @flow

import http from 'http';
import app from './src/app/app.js';

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port);
