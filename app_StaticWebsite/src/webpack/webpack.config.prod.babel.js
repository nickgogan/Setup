import path from 'path';
import webpack from 'webpack';
import WebpackMerge from 'webpack-merge'; // eslint-disable-line
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import WebpackHtmlHarddiskPlugin from 'html-webpack-harddisk-plugin'; // eslint-disable-line
import WebpackExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import DotenvWebpackPlugin from 'dotenv-webpack'; // eslint-disable-line
import dotEnv from 'dotenv-safe'; // eslint-disable-line

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
import common from './webpack.common'; // eslint-disable-line
// import loadTemplates from './parts/prod/htmlLoader.babel';
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
  plugins: [dotEnvWebpack, htmlIndex, htmlToHdd] // , webpackMonitor
});
