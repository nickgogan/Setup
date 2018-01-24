import path from 'path';
import WebpackMerge from 'webpack-merge';
import dotEnv from 'dotenv-safe';
import DotenvWebpackPlugin from 'dotenv-webpack';
import WebpackMonitorPlugin from 'webpack-monitor';

/*
########################################
        Import Lower Config and Loaders
########################################
*/
import common from './webpack.common';
import loadTemplates from './parts/prod/templatesLoader.babel';
import loadStyles from './parts/prod/postcssLoader.babel';
import loadBabel from './parts/prod/babelLoader.babel';

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
  loadTemplates(), // This has to come first to get Critical CSS working.
  loadStyles(),
  {
    output: {
      path: ENV.OUT_FULL_PATH,
      filename: `[name].js`,
      chunkFilename: `[name].v${ENV.VERSION}.js`
      // publicPath: OUT_PATH
    },
    plugins: [dotEnvWebpack] // , webpackMonitor
  }
);
