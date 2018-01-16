// @ts-check
// @flow

import http from 'http';
import app from '../app';

const helpers = require('./helpers/helpers');

const port = helpers.environment.PORT || 3001;
const server = http.createServer(app);

server.listen(port);
