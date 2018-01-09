// @ts-check

import path from 'path';
import morgan from 'morgan';
import winston from 'winston';
import fileStreamRotator from 'file-stream-rotator';

// Logging implementation
const logLevel = process.env.LOG_logLevel || 'debug';
const logDir = path.join(__dirname, 'logs');
const logTypes = {
  errors: 'errors',
  processes: 'processes'
};
const logErrorStream = fileStreamRotator.getStream({
  filename: path.join(logDir, logTypes.errors),
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYYMMDD'
});
const logOutputStream = fileStreamRotator.getStream({
  filename: path.join(logDir, logTypes.processes),
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYYMMDD'
});

export const outputLog = morgan('dev', {
  skip: (req, res) => res.statusCode < 400,
  stream: logOutputStream
});

export const errorLog = morgan('dev', {
  skip: (req, res) => res.statusCode >= 400,
  stream: logErrorStream
});

export const winstonLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      logLevel,
      timestamp: () => new Date().toISOString()
    })
  ]
});

// Error handling functions
// 404
export function resourceMissing(req, res, next) {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
}
