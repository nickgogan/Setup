import path from 'path';
import webpack from 'webpack';
import WebpackMerge from 'webpack-merge'; // eslint-disable-line
import dotEnv from 'dotenv-safe'; // eslint-disable-line
import DotenvWebpackPlugin from 'dotenv-webpack'; // eslint-disable-line
import CleanWebpackPlugin from 'clean-webpack-plugin'; // eslint-disable-line
import WebpackMonitorPlugin from 'webpack-monitor';

/*
########################################
        Import Lower Config and Loaders
########################################
*/
import common from './webpack.common'; // eslint-disable-line
import loadTemplates from './parts/prod/templatesLoader.babel';
import loadStyles from './parts/prod/postcssLoader.babel'; // eslint-disable-line
import loadBabel from './parts/prod/babelLoader.babel'; // eslint-disable-line

/*
########################################
                    Define Constants
########################################
*/
// Needed for use in this config file.
const env = dotEnv.load({
  path: path.resolve(__dirname, './../env/prod.env'),
  sample: path.resolve(__dirname, './../env/prod.example.env')
}).parsed;
env.OUT_FULL_PATH = path.resolve(__dirname, '../../', env.DEST);
const ENV = Object.assign({}, common.PATHS, env);

/*
########################################
                      Define Plugins
########################################
*/
// Webpack sets the app-wide process.env.* variables.
const dotEnvWebpack = new DotenvWebpackPlugin({
  path: path.join(__dirname, '../env/prod.env'),
  safe: false
});
const cleanWebpack = new CleanWebpackPlugin([ENV.OUT_FULL_PATH]);
const webpackMonitor = new WebpackMonitorPlugin({
  capture: true,
  launch: true,
  port: 3000
});

/*
########################################
              Exported Webpack Config
########################################
*/
export default WebpackMerge(
  common.config,
  loadBabel(),
  loadStyles(),
  loadTemplates(),
  {
    output: {
      path: ENV.OUT_FULL_PATH,
      filename: `[name].js`,
      chunkFilename: `[name].v${ENV.VERSION}.js`
      // publicPath: OUT_PATH
    },
    plugins: [dotEnvWebpack, cleanWebpack] // , webpackMonitor
  }
);
