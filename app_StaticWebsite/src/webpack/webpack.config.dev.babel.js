import path from 'path';
import dotEnv from 'dotenv-safe';
import webpack from 'webpack';
import MergePlugin from 'webpack-merge';
import DotenvPlugin from 'dotenv-webpack';
import MonitorPlugin from 'webpack-monitor';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import GitRevisionPlugin from 'git-revision-webpack-plugin';
import InlineManifestPlugin from 'inline-manifest-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import OfflinePlugin from 'offline-plugin';

/*
########################################
        Import Lower Config and Loaders
########################################
*/
import common from './webpack.common';
import loadTemplates from './parts/dev/templatesLoader.babel';
import loadStyles from './parts/dev/postcssLoader.babel';
import loadBabel from './parts/dev/babelLoader.babel';
import extractBundles from './parts/extractBundles.babel';

/*
########################################
                    Define Constants
########################################
*/
// Needed for use in this config file.
const env = dotEnv.load({
  path: path.resolve(__dirname, './../env/dev.env'),
  sample: path.resolve(__dirname, './../env/dev.example.env'),
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
  path: path.join(__dirname, '../env/dev.env'),
  safe: path.join(__dirname, '../env/dev.example.env'),
});
const webpackMonitor = new MonitorPlugin({
  capture: true,
  launch: true,
  port: 3000,
});
const webpackModuleConcatenator = new webpack.optimize.ModuleConcatenationPlugin();
const webpackBanner = new webpack.BannerPlugin({
  banner: new GitRevisionPlugin().version(),
});
const webpackCompression = new CompressionPlugin({
  test: /\.js($|\?)/i,
  deleteOriginalAssets: true,
});
const HMR = new webpack.HotModuleReplacementPlugin();

/*
########################################
              Exported Webpack Config
########################################
*/

export default MergePlugin(
  common.config,
  loadBabel(),
  loadTemplates(),
  loadStyles(),
  extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource, }) => /node_modules/.test(resource), // Only pull in that used code from node_modules.
    },
    {
      name: 'manifest',
      filename: 'webpack-runtime.js',
      minChunks: Infinity,
    },
    {
      async: true,
      children: true,
      name: 'CommonLazy',
    },
  ]),
  {
    entry: {
      hmr: [
        'webpack/hot/dev-server',
        `webpack-dev-server/client?http://localhost:3001`,
      ],
    },
    output: {
      path: ENV.OUT_FULL_PATH,
      filename: `[name].[chunkhash:8].js`,
    },
    plugins: [
      appEnv,
      new webpack.NamedModulesPlugin(),
      new webpack.NamedChunksPlugin(), // Uses the /* webpackChunkName: "..." */ labels
      // Name non-normal modules. Like NormalModulesPlugin, but can handle those and non-normal modules, like external modules., new OfflinePlugin(),], // , webpackMonitor
      {
        apply(compiler) {
          compiler.plugin('compilation', compilation => {
            compilation.plugin('before-module-ids', modules => {
              modules.forEach(module => {
                if (module.id !== null) {
                  return;
                }
                module.id = module.identifier(); // eslint-disable-line
              });
            });
          });
        },
      },
      webpackModuleConcatenator,
      new InlineManifestPlugin(),
      // webpackCompression,
      // webpackMonitor,
      // new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
      new OfflinePlugin(),
      HMR,
    ],
    devServer: {
      contentBase: path.join(ENV.SRC_FULL_PATH, 'assets'),
      host: ENV.HOST,
      port: ENV.PORT,
      overlay: true,
    },
  }
);
