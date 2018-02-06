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
import loadTemplates from './parts/prod/templatesLoader.babel';
import loadStyles from './parts/prod/postcssLoader.babel';
import loadBabel from './parts/prod/babelLoader.babel';
import loadAssets from './parts/prod/assetsLoader.babel';
import extractBundles from './parts/extractBundles.babel';

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
const webpackProgress = new webpack.ProgressPlugin();
const appEnv = new DotenvPlugin({
  path: path.join(__dirname, '../env/prod.env'),
  safe: path.join(__dirname, '../env/prod.example.env'),
});
// const webpackSourceMaps = new webpack.SourceMapDevToolPlugin({
//   filename: '[name].[chunkhash:8].map',
//   // Excluded by chunk names
//   exclude: ['vendor', 'hmr', 'webpack-runtime', 'sw',],
// });
const webpackBanner = new webpack.BannerPlugin({
  banner: new GitRevisionPlugin().version(),
});
const webpackNamedModules = new webpack.NamedModulesPlugin();
const webpackNamedChunks = new webpack.NamedChunksPlugin(); // Uses the /* webpackChunkName: "..." */ labels
// Name non-normal modules. Like NormalModulesPlugin, but can handle those and non-normal modules, like external modules.
const nameNonNormalModules = {
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
};
const webpackModuleConcatenator = new webpack.optimize.ModuleConcatenationPlugin();
const webpackInlineManifest = new InlineManifestPlugin();
const webpackCompression = new CompressionPlugin({
  test: /\.js($|\?)/i,
  algorithm: 'gzip',
  minRatio: 0.8,
  deleteOriginalAssets: true,
});
const webpackServiceWorker = new OfflinePlugin();
const webpackMonitor = new MonitorPlugin({
  capture: true,
  launch: true,
  port: 3000,
});
const webpackBundleAnalyzer = new BundleAnalyzerPlugin.BundleAnalyzerPlugin();

/*
########################################
              Exported Webpack Config
########################################
*/
export default MergePlugin(
  common.config, // Must be the first merged item.
  loadBabel(),
  loadTemplates(), // This has to come first to get Critical CSS working.
  loadStyles(),
  extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource, }) => /node_modules/.test(resource), // Only pull in that used code from node_modules.
    },
    {
      name: 'manifest',
      filename: 'webpack-runtime.[hash:8].js',
      minChunks: Infinity,
    },
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
    },
    plugins: [
      webpackProgress,
      appEnv,
      // webpackSourceMaps,
      webpackBanner,
      webpackNamedModules,
      webpackNamedChunks,
      nameNonNormalModules,
      webpackInlineManifest,
      webpackModuleConcatenator,
      // webpackCompression,
      // webpackServiceWorker,
      // webpackMonitor,
      // webpackBundleAnalyzer
    ],
  }
);
