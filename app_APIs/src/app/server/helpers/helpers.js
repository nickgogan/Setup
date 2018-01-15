// @ts-check

import * as dotEnv from 'dotenv-safe';
import path from 'path';
/*
########################################
          App-wide Environment Variables

Import the environment variables from an external
file, depending upon what NODE_ENV is.
########################################
*/
let env;
if (process.env.NODE_ENV === 'dev') {
  env = dotEnv.load({
    path: path.resolve(__dirname, '../../env/dev.env'),
    sample: path.resolve(__dirname, '../../env/dev.env.example'),
    allowEmptyValues: true
  });
} else {
  env = dotEnv.load({
    path: 'src/app/env/prod.env',
    sample: 'src/app/env/prod.env.example',
    allowEmptyValues: true
  });
}
export const environment = env.parsed;

/*
########################################
                  HTTP Error Handlers


Functions to handle various http errros.
########################################
*/
// 404s
export function resourceMissing(req, res, next) {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
}
