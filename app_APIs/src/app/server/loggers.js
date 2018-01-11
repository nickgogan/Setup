// @ts-check

import path from 'path';
import winston from 'winston';
import * as dotEnv from 'dotenv-safe';

const env = dotEnv.load({
  path: 'src/app/server/env/.env',
  sample: 'src/app/server/env/.env.example',
  allowEmptyValues: true
});

/*
########################################
                        Winston Setup

Create transport streams and add to Winston
########################################
*/
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

const devWinstonConsoleStream = new winston.transports.Console({
  level: 'debug',
  handleExceptions: true,
  colorize: true,
  humanReadableUnhandledException: true
});
const devWinstonInfoStream = new winston.transports.DailyRotateFile({
  level: 'info',
  name: 'log.info',
  filename: path.join(__dirname, 'server/logs/info', 'log.info'),
  datePattern: '.yyyy-MM-dd',
  createTree: true,
  handleExceptions: false,
  json: true,
  maxsize: 5242880,
  maxFiles: 10,
  colorize: false
});
const devWinstonWarnStream = new winston.transports.DailyRotateFile({
  level: 'warn',
  name: 'log.warn',
  filename: path.join(__dirname, 'server/logs/warn', 'log.warn'),
  datePattern: '.yyyy-MM-dd',
  createTree: true,
  handleExceptions: false,
  json: true,
  maxsize: 5242880,
  maxFiles: 10,
  colorize: false
});
const devWinstonErrorStream = new winston.transports.DailyRotateFile({
  level: 'error',
  name: 'log.error',
  filename: path.join(__dirname, 'server/logs/errors', 'log.error'),
  datePattern: '.yyyy-MM-dd',
  createTree: true,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  json: true,
  prettyPrint: true,
  maxsize: 5242880,
  maxFiles: 10,
  colorize: false
});

const logger = new winston.Logger({
  transports: [
    devWinstonConsoleStream,
    devWinstonInfoStream,
    devWinstonWarnStream,
    devWinstonErrorStream
  ],
  exitOnError: false
});

logger.stream = {
  write: (message, encoding) => {
    logger.debug(message);
  }
};

export default logger;
