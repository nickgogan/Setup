// @ts-check

import path from 'path';
import webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import WebpackHtmlHarddiskPlugin from 'html-webpack-harddisk-plugin';
import WebpackExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import DotenvWebpackPlugin from 'dotenv-webpack'; // eslint-disable-line import/no-extraneous-dependencies
import dotEnv from 'dotenv-safe'; // eslint-disable-line import/no-extraneous-dependencies

/*
########################################
        Import Lower Config and Loaders
########################################
*/
import common from './webpack.common';
import loadStyles from './parts/dev/webpack.config.postcssLoader.babel';
import loadBabel from './parts/webpack_babel';

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
// Needed to tell the app files what the environment is.
const dotEnvWebpack = new DotenvWebpackPlugin({
  path: path.join(__dirname, '../env/dev.env'),
  safe: false
});
const htmlToHdd = new WebpackHtmlHarddiskPlugin({
  outputPath: path.resolve(__dirname, '../../dist')
});
const htmlIndex = new WebpackHtmlPlugin({
  template: path.resolve(__dirname, '../templates/index.html'),
  title: 'MyApp',
  desc: 'This is my app.',
  inject: 'body',
  alwaysWriteToDisk: true
});
const HMR = new webpack.HotModuleReplacementPlugin();

/*
########################################
                        PROD
########################################
*/
const extractText = new WebpackExtractTextPlugin({
  allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
  filename: './styles.bundle.css'
});

/*
########################################
              Exported Webpack Config
########################################
*/

export default WebpackMerge(common.config, loadBabel(), loadStyles(), {
  plugins: [dotEnvWebpack, htmlIndex, htmlToHdd, extractText, HMR],
  devServer: {
    contentBase: path.join(ENV.SRC_FULL_PATH, 'assets'),
    host: ENV.HOST,
    port: ENV.PORT,
    overlay: true
  }
});
