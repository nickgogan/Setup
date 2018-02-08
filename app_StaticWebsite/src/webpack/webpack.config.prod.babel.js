import path from 'path';
import dotEnv from 'dotenv-safe';
import webpack from 'webpack';
import MergePlugin from 'webpack-merge';
import MonitorPlugin from 'webpack-monitor';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import GitRevisionPlugin from 'git-revision-webpack-plugin';
import InlineManifestPlugin from 'inline-manifest-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
// import { getIfUtils, removeEmpty } from 'webpack-config-utils'; // eslint-disable-line
import nameNonNormalModules from './helpers/nameNonNormalModules';
import setEnvironment from './helpers/setEnvironment';
/*
########################################
                      Import loaders
########################################
*/
import loadTemplates from './parts/templatesLoader.babel';
import loadBabel from './parts/babelLoader.babel';
import loadStyles from './parts/postcssLoader.babel';
import extractBundles from './parts/extractBundles.babel';
/*
########################################
                      Define Plugins
########################################
*/
const webpackProgress = new webpack.ProgressPlugin();
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
export default env => {
  const ENV = setEnvironment(env);

  return MergePlugin(
    loadBabel(ENV.WEBPACK_ENV),
    loadTemplates(ENV.WEBPACK_ENV, ['index', '404', '500',]),
    loadStyles(ENV.WEBPACK_ENV), // Assets handled by the PostCSS pipeline.
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
      target: ENV.PLATFORM,
      entry: {
        main: [path.join(ENV.SRC_FULL_PATH, 'js/main.js'),],
      },
      output: {
        path: ENV.OUT_FULL_PATH,
        filename: `[name].[chunkhash:8].js`,
      },

      // Prevents weird fs errors. See 'Weird Findings' #6
      externals: {
        fs: 'commonjs fs',
      },
      // node: {
      //   fs: 'empty'
      //   // fs: 'commonjs fs'
      // },

      // Allow absolute paths in imports.
      resolve: {
        modules: ['node_modules', ENV.SRC_FULL_PATH,],
        extensions: ['.js', '.postcss', 'html',],
      },

      plugins: [
        webpackProgress,
        new webpack.DefinePlugin(ENV), // Webpack sets the app-wide process.env.* variables.
        // webpackSourceMaps,
        webpackBanner,
        webpackNamedModules,
        webpackNamedChunks,
        nameNonNormalModules,
        webpackInlineManifest,
        webpackModuleConcatenator,
        // webpackCompression,
        webpackServiceWorker,
        // webpackMonitor,
        // webpackBundleAnalyzer
      ],
    }
  );
};
