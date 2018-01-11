// @ts-check

import http from 'http';
import * as dotEnv from 'dotenv-safe';
import app from '../app';
import * as helpers from './helpers';

const env = dotEnv.load({
  path: 'src/app/server/env/.env',
  sample: 'src/app/server/env/.env.example',
  allowEmptyValues: true
});

const port = env.PORT || 3001;
const server = http.createServer(app);

server.listen(port);
