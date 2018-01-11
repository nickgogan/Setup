// @ts-check

import * as dotEnv from 'dotenv-safe';

/*
########################################
          App-wide Environment Variables

Import the environment variables from external file
########################################
*/
export const env = dotEnv.load({
  path: 'src/app/env/.env',
  sample: 'src/app/env/.env.example',
  allowEmptyValues: true
});

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
