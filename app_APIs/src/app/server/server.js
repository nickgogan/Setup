// @ts-check

import http from 'http';
import app from '../app';
import * as helpers from './helpers';

const port = helpers.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port);
