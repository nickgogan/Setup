import path from 'path';
import dotEnv from 'dotenv-safe'; // eslint-disable-line
import pkg from '../../../package.json';

const generateEnv = env => {
  const commonEnv = dotEnv.load({
    path: path.resolve(__dirname, './../../env/common.env'),
    sample: path.resolve(__dirname, './../../env/common.example.env'),
  }).parsed;

  let specificEnv;
  if (env.prod) {
    specificEnv = dotEnv.load({
      path: path.resolve(__dirname, './../../env/prod.env'),
      sample: path.resolve(__dirname, './../../env/prod.example.env'),
    }).parsed;
  } else if (env.dev) {
    specificEnv = dotEnv.load({
      path: path.resolve(__dirname, './../../env/dev.env'),
      sample: path.resolve(__dirname, './../../env/dev.example.env'),
    }).parsed;
  }
  return Object.assign({}, commonEnv, specificEnv);
};

export default env => {
  const ENV = generateEnv(env);

  return {
    VERSION: pkg.version,
    PLATFORM: ENV.PLATFORM,
    SRC_FULL_PATH: path.resolve(__dirname, '../../../', ENV.SRC),
    OUT_FULL_PATH: path.resolve(__dirname, '../../../', ENV.DEST),
    HOST: ENV.HOST,
    PORT: ENV.PORT,
    LOG_LEVEL: ENV.LOG_LEVEL,
    'process.env.NODE_ENV': ENV.NODE_ENV, // Mostly for React, Babel, and other libs
    WEBPACK_ENV: ENV.WEBPACK_ENV,
  };
};
