// @ts-check
// @flow

import path from 'path';
import dotEnv from 'dotenv-safe';

const commonSettings = dotEnv.load({
  path: path.resolve(__dirname, '../env/common.env'),
  sample: path.resolve(__dirname, '../env/common.example.env'),
  allowEmptyValues: true
});

const environment = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod';

const specializedSettings = dotEnv.load({
  path: path.resolve(__dirname, '../env/', `${environment}.env`),
  sample: path.resolve(__dirname, '../env/', `${environment}.env`),
  allowEmptyValues: false
});

const env = Object.assign(
  {},
  commonSettings.parsed,
  specializedSettings.parsed
);

export default env;
