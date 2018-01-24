import path from 'path';
import webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import WebpackMonitorPlugin from 'webpack-monitor';
import DotenvWebpackPlugin from 'dotenv-webpack';
import dotEnv from 'dotenv-safe';

/*
########################################
        Import Lower Config and Loaders
########################################
*/
import common from './webpack.common';
import loadTemplates from './parts/dev/templatesLoader.babel';
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
env.OUT_FULL_PATH = path.resolve(__dirname, '../../', env.DEST);
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

export default WebpackMerge(
  common.config,
  loadBabel(),
  loadTemplates(),
  loadStyles(),
  {
    entry: {
      hmr: [
        'webpack/hot/dev-server',
        `webpack-dev-server/client?http://localhost:3001`
      ]
    },
    plugins: [dotEnvWebpack, HMR], // , webpackMonitor
    output: {
      path: ENV.OUT_FULL_PATH,
      filename: `[name].js`,
      chunkFilename: `[name].v${ENV.VERSION}.js`
      // publicPath: OUT_PATH
    },
    devServer: {
      contentBase: path.join(ENV.SRC_FULL_PATH, 'assets'),
      host: ENV.HOST,
      port: ENV.PORT,
      overlay: true
    }
  }
);
