// @ts-check
// @flow

import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin'; // eslint-disable-line import/no-extraneous-dependencies
import DotenvWebpackPlugin from 'dotenv-webpack'; // eslint-disable-line import/no-extraneous-dependencies
import dotEnv from 'dotenv-safe'; // eslint-disable-line import/no-extraneous-dependencies
import pkg from '../../package.json';

/*
########################################
                        Constants
########################################
*/
// Used just within this particular config file.
const env = dotEnv.load({
  path: path.resolve(__dirname, './../env/common.env'),
  sample: path.resolve(__dirname, './../env/common.example.env')
}).parsed;

// Make webpack add these to the program-wide process.env object.
const dotEnvWebpack = new DotenvWebpackPlugin({
  path: path.resolve(__dirname, '../env/common.env'),
  safe: false
});

// Make the paths cross-platform and then export them out for the higher-level configs.
function setPaths() {
  const SRC_PATH = path.normalize(env.SRC_PATH);
  const SRC_FULL_PATH = path.resolve(__dirname, '../', SRC_PATH);
  const OUT_PATH = path.normalize(env.OUT_PATH);
  const OUT_FULL_PATH = path.resolve(__dirname, '../', OUT_PATH);

  return {
    SRC_PATH,
    SRC_FULL_PATH,
    OUT_PATH,
    OUT_FULL_PATH
  };
}
const PATHS = setPaths();
module.exports.PATHS = PATHS;

/*
########################################
              Exported Webpack Config
########################################
*/
module.exports.config = {
  // context:
  // target: node

  entry: {
    main: path.join(PATHS.SRC_FULL_PATH, 'js/main.js')
  },

  // Prevents weird fs errors. See 'Weird Findings' #6
  externals: {
    fs: 'commonjs fs'
  },

  // node: {
  //   fs: 'empty'
  //   // fs: 'commonjs fs'
  // },

  output: {
    path: PATHS.OUT_FULL_PATH,
    filename: `[name].js`,
    chunkFilename: `[name].v${pkg.version}.js`
    // publicPath: OUT_PATH
  },

  // Allow absolute paths in imports.
  resolve: {
    modules: ['node_modules', PATHS.SRC_FULL_PATH],
    extensions: ['.js']
  },

  plugins: [
    // cleaning up the build directory prior to update
    new CleanWebpackPlugin([PATHS.OUT_FULL_PATH])
  ]
};
