import path from 'path';
import dotEnv from 'dotenv-safe'; // eslint-disable-line
import { getIfUtils } from 'webpack-config-utils'; // eslint-disable-line
import pkg from '../../../package.json';

const test = 'dev';
const { ifProduction, } = getIfUtils(test);

const commonEnv = dotEnv.load({
  path: path.resolve(__dirname, './../../env/common.env'),
  sample: path.resolve(__dirname, './../../env/common.example.env'),
}).parsed;

let specificEnv;
ifProduction(
  (specificEnv = dotEnv.load({
    path: path.resolve(__dirname, './../../env/prod.env'),
    sample: path.resolve(__dirname, './../../env/prod.example.env'),
  }).parsed),
  (specificEnv = dotEnv.load({
    path: path.resolve(__dirname, './../../env/dev.env'),
    sample: path.resolve(__dirname, './../../env/dev.example.env'),
  }).parsed)
);

export default env => ({
  VERSION: pkg.version,
  PLATFORM: commonEnv.PLATFORM,
  SRC_FULL_PATH: path.resolve(__dirname, '../../../', commonEnv.SRC),
  OUT_FULL_PATH: path.resolve(__dirname, '../../../', specificEnv.DEST),
  HOST: specificEnv.HOST,
  PORT: specificEnv.PORT,
  LOG_LEVEL: specificEnv.LOG_LEVEL,
  NODE_ENV: specificEnv.NODE_ENV,
  WEBPACK_ENV: specificEnv.WEBPACK_ENV,
});
