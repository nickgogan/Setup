import path from 'path';
import env from '../env/env';

module.exports = {
  entry: {
    index: path.resolve(env.SRC_FULL_PATH, '../js/main.js')
  },
  output: {
    filename: `[name].js`,
    path: env.SRC_FULL_PATH
  }
};
