import webpack from 'webpack'; // eslint-disable-line
import path from 'path';
import DotenvWebpackPlugin from 'dotenv-webpack'; // eslint-disable-line
import dotEnv from 'dotenv-safe'; // eslint-disable-line
import pkg from '../../package.json';

/*
########################################
                        Constants
########################################
*/
// Used just within this particular config file.
const env = dotEnv.load({
  path: path.resolve(__dirname, './../env/common.env'),
  sample: path.resolve(__dirname, './../env/common.example.env'),
}).parsed;

// Make webpack add these to the program-wide process.env object.
const dotEnvWebpack = new DotenvWebpackPlugin({
  path: path.resolve(__dirname, '../env/common.env'),
  safe: false,
});

// Make the paths cross-platform and then export them out for the higher-level configs.
function setPaths() {
  const SRC_FULL_PATH = path.resolve(__dirname, '../../', env.SRC);

  return {
    SRC_FULL_PATH,
    VERSION: pkg.version,
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
  target: env.platform,

  entry: {
    main: [path.join(PATHS.SRC_FULL_PATH, 'js/main.js'),],
    // page: [
    //   path.join(PATHS.SRC_FULL_PATH, 'js/page.js')
    // ]
  },

  // Prevents weird fs errors. See 'Weird Findings' #6
  externals: {
    fs: 'commonjs fs',
  },

  // node: {
  //   fs: 'empty'
  //   // fs: 'commonjs fs'
  // },

  // Allow absolute paths in imports.
  resolve: {
    modules: ['node_modules', PATHS.SRC_FULL_PATH,],
    extensions: ['.js',],
  },
  // plugins: []
};
