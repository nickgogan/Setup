// @ts-check

import path from 'path';
import morgan from 'morgan';
import winston from 'winston';
import fileStreamRotator from 'file-stream-rotator';
import * as dotEnv from 'dotenv-safe';

/*
########################################
          App-wide Environment Variables

Import the environment variables from external file
########################################
*/

export const env = dotEnv.load({
  path: 'src/app/server/env/.env',
  sample: 'src/app/server/env/.env.example',
  allowEmptyValues: true
});

/*
########################################
                     Logging - Setup

Setup variables for server logging frameworks
########################################
*/

const logLevel = env.LOG_logLevel || 'debug';

const logDir = path.join(__dirname, 'logs');

const logTypes = {
  stderr: 'errors',
  stdout: 'output'
};

const logErrorStream = fileStreamRotator.getStream({
  filename: path.join(logDir, logTypes.stderr),
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYYMMDD'
});

const logOutputStream = fileStreamRotator.getStream({
  filename: path.join(logDir, logTypes.stdout),
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYYMMDD'
});

/*
########################################
                   Logging - Files

Set up a daily rotating set of log files for standard outputs and for error outputs.

'dev' corresponds to a morgan-specific output type that has colors for easier reading. It does this by appending some extra characters that the Node console object can interpret.
Use 'combined' when NODE_ENV='prod' so that these extra color characters aren't polluting the logs that would be seen through tools other than Node's console.
########################################
*/

export const outputLog = morgan('dev', {
  skip: (req, res) => res.statusCode < 400,
  stream: logOutputStream
});

// Make your life easier by putting actual HTTP errors in a separate log file.
export const errorLog = morgan('dev', {
  skip: (req, res) => res.statusCode >= 400,
  stream: logErrorStream
});

/*
########################################
                    Logging - Console
########################################
*/
const winstonLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: () => new Date().toISOString()
    })
  ],
  exitOnError: false
});
winstonLogger.emitErrs = true;
// console.log(typeof winstonLogger);

export function winstorLoggerWriter(message, encoding) {
  winstonLogger.info(message);
}
// console.log(typeof winstorLoggerWriter);

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
