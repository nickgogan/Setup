import path from 'path';
import webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import WebpackHtmlHarddiskPlugin from 'html-webpack-harddisk-plugin';
import WebpackExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import DotenvWebpackPlugin from 'dotenv-webpack'; // eslint-disable-line import/no-extraneous-dependencies
import dotEnv from 'dotenv-safe'; // eslint-disable-line import/no-extraneous-dependencies

import WebpackMonitorPlugin from 'webpack-monitor';

const webpackMonitor = new WebpackMonitorPlugin({
  capture: true,
  launch: true,
  port: 3000
});

/*
########################################
        Import Lower Config and Loaders
########################################
*/
import common from './webpack.common';
// import loadTemplates from './parts/prod/templatesLoader.babel';
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
const htmlToHdd = new WebpackHtmlHarddiskPlugin({
  outputPath: path.resolve(__dirname, '../../dist')
});
const htmlIndex = new WebpackHtmlPlugin({
  template: path.resolve(__dirname, '../templates/index.html'),
  title: 'MyApp',
  desc: 'This is my app.',
  inject: 'body'
  // alwaysWriteToDisk: true // htmlToHdd should handle this.
});
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
  plugins: [dotEnvWebpack, htmlIndex, htmlToHdd, webpackMonitor]
});
