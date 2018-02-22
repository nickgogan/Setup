import path from 'path';
import dotEnv from 'dotenv-safe'; // eslint-disable-line
import pkg from '../../../package.json';

const generateEnv = env => {
  const commonEnv = dotEnv.load({
    path: path.resolve(__dirname, './../../env/common.env'),
    sample: path.resolve(__dirname, './../../env/common.example.env'),
  }).parsed;

  let specificEnv;
  if (env === 'production') {
    specificEnv = dotEnv.load({
      path: path.resolve(__dirname, './../../env/prod.env'),
      sample: path.resolve(__dirname, './../../env/prod.example.env'),
    }).parsed;
  } else if (env === 'development') {
    specificEnv = dotEnv.load({
      path: path.resolve(__dirname, './../../env/dev.env'),
      sample: path.resolve(__dirname, './../../env/dev.example.env'),
    }).parsed;
  } else {
    console.log('====================================');
    console.log(`ERROR IN setEnvironment - env is ${env}`);
    console.log('====================================');
  }
  return Object.assign({}, commonEnv, specificEnv);
};

export default env => {
  const ENV = generateEnv(env);

  // NODE_ENV set by cross-env in the build scripts.
  return {
    VERSION: pkg.version,
    PLATFORM: ENV.PLATFORM,
    SRC_FULL_PATH: path.resolve(__dirname, '../../../', ENV.SRC),
    OUT_FULL_PATH: path.resolve(__dirname, '../../../', ENV.DEST),
    HOST: ENV.HOST,
    PORT: ENV.PORT,
    LOG_LEVEL: ENV.LOG_LEVEL,
    'process.env.NODE_ENV': ENV.NODE_ENV,
    WEBPACK_ENV: ENV.WEBPACK_ENV,
  };
};
