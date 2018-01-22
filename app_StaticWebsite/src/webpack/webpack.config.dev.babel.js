// @ts-check

import path from 'path';
import webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import WebpackMonitorPlugin from 'webpack-monitor';
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import WebpackHtmlHarddiskPlugin from 'html-webpack-harddisk-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack'; // eslint-disable-line import/no-extraneous-dependencies
import dotEnv from 'dotenv-safe'; // eslint-disable-line import/no-extraneous-dependencies

/*
########################################
        Import Lower Config and Loaders
########################################
*/
import common from './webpack.common';
// import loadTemplates from './parts/dev/templatesLoader.babel';
import loadStyles from './parts/dev/postcssLoader.babel';
import loadBabel from './parts/dev/babelLoader.babel';

/*
########################################
                    Define Constants
########################################
*/
// Needed for use in this config file.
const env = dotEnv.load({
  path: path.resolve(__dirname, './../env/dev.env'),
  sample: path.resolve(__dirname, './../env/dev.example.env')
}).parsed;
const ENV = Object.assign({}, common.PATHS, env);

/*
########################################
                      Define Plugins
########################################
*/
// Webpack sets the app-wide process.env.* variables.
const dotEnvWebpack = new DotenvWebpackPlugin({
  path: path.join(__dirname, '../env/dev.env'),
  safe: false
});
const htmlToHdd = new WebpackHtmlHarddiskPlugin({
  outputPath: path.resolve(__dirname, '../../build')
});
const htmlIndex = new WebpackHtmlPlugin({
  template: path.resolve(__dirname, '../templates/index.html'),
  title: 'MyApp',
  desc: 'This is my app.',
  inject: 'body'
  // alwaysWriteToDisk: true // htmlToHdd should handle this.
});
const webpackMonitor = new WebpackMonitorPlugin({
  capture: true,
  launch: true,
  port: 3000
});
const HMR = new webpack.HotModuleReplacementPlugin();

/*
########################################
              Exported Webpack Config
########################################
*/

export default WebpackMerge(common.config, loadBabel(), loadStyles(), {
  entry: {
    hmr: [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?http://localhost:3001`
    ]
  },
  plugins: [dotEnvWebpack, htmlIndex, htmlToHdd, webpackMonitor, HMR],
  devServer: {
    contentBase: path.join(ENV.SRC_FULL_PATH, 'assets'),
    host: ENV.HOST,
    port: ENV.PORT,
    overlay: true
  }
});
