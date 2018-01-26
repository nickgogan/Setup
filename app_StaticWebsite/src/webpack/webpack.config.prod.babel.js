import path from 'path';
import webpack from 'webpack';
import dotEnv from 'dotenv-safe';
import MergePlugin from 'webpack-merge';
import DotenvPlugin from 'dotenv-webpack';
import MonitorPlugin from 'webpack-monitor';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import GitRevisionPlugin from 'git-revision-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CacheBundles from 'hard-source-webpack-plugin';

/*
########################################
        Import Lower Config and Loaders
########################################
*/
import common from './webpack.common';
import loadTemplates from './parts/prod/templatesLoader.babel';
import loadStyles from './parts/prod/postcssLoader.babel';
import loadBabel from './parts/prod/babelLoader.babel';
import extractBundles from './parts/prod/extractBundles.babel';

/*
########################################
                    Define Constants
########################################
*/
// Needed for use in this config file.
const env = dotEnv.load({
  path: path.resolve(__dirname, './../env/prod.env'),
  sample: path.resolve(__dirname, './../env/prod.example.env'),
}).parsed;
env.OUT_FULL_PATH = path.resolve(__dirname, '../../', env.DEST);
const ENV = Object.assign({}, common.PATHS, env);

/*
########################################
                      Define Plugins
########################################
*/
// Webpack sets the app-wide process.env.* variables.
const appEnv = new DotenvPlugin({
  path: path.join(__dirname, '../env/prod.env'),
  safe: false,
});
const webpackMonitor = new MonitorPlugin({
  capture: true,
  launch: true,
  port: 3000,
});
const webpackCompression = new CompressionPlugin({
  test: /\.js($|\?)/i,
  deleteOriginalAssets: true,
});
const webpackModuleConcatenator = new webpack.optimize.ModuleConcatenationPlugin();
const webpackBanner = new webpack.BannerPlugin({
  banner: new GitRevisionPlugin().version(),
});

/*
########################################
              Exported Webpack Config
########################################
*/
export default MergePlugin(
  common.config,
  loadBabel(),
  loadTemplates(), // This has to come first to get Critical CSS working.
  loadStyles(),
  extractBundles([
    {
      name: 'react',
      minChunks: ({ resource }) => /node_modules/.test(resource), // Only pull in that used code from node_modules.
    },
    {
      name: 'WebpackRuntime',
      minChunks: Infinity,
    },
    //
    {
      async: true,
      children: true,
      name: 'CommonLazy',
    },
  ]),
  {
    output: {
      path: ENV.OUT_FULL_PATH,
      filename: `[name].[chunkhash:8].js`,
      chunkFilename: `[name].v${ENV.VERSION}.js`,
      // publicPath: OUT_PATH
    },
    plugins: [
      appEnv,
      webpackBanner,
      webpackModuleConcatenator,
      // webpackCompression,
      new CacheBundles(),
      // webpackMonitor
      // new BundleAnalyzerPlugin.BundleAnalyzerPlugin()
    ],
  },
);
