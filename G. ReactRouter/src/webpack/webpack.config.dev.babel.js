import path from 'path';
import webpack from 'webpack';
import MergePlugin from 'webpack-merge';
import MonitorPlugin from 'webpack-monitor';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import InlineManifestPlugin from 'inline-manifest-webpack-plugin';

import nameNonNormalModules from './helpers/nameNonNormalModules';
import setEnvironment from './helpers/setEnvironment';
import stringifyEnvironment from './helpers/stringifyEnvironment';

/*
########################################
                      Import loaders
########################################
*/
import loadBabel from './parts/babelLoader.babel';
import loadAssets from './parts/assetsLoader.babel';
import loadTemplates from './parts/templatesLoader.babel';
import loadStyles from './parts/postcssLoader.babel';
import extractBundles from './parts/extractBundles.babel';

/*
########################################
                      Define Plugins
########################################
*/

const webpackProgress = new webpack.ProgressPlugin();
const webpackNamedModules = new webpack.NamedModulesPlugin();
const webpackNamedChunks = new webpack.NamedChunksPlugin(); // Uses the /* webpackChunkName: "..." */ labels
const webpackModuleConcatenator = new webpack.optimize.ModuleConcatenationPlugin();
const webpackInlineManifest = new InlineManifestPlugin();
const webpackMonitor = new MonitorPlugin({
  capture: true,
  launch: true,
  port: 3000,
});
const webpackBundleAnalyzer = new BundleAnalyzerPlugin.BundleAnalyzerPlugin();
const HMR = new webpack.HotModuleReplacementPlugin();

/*
########################################
              Exported Webpack Config
########################################
*/

export default () => {
  const ENV = setEnvironment('development');

  return MergePlugin(
    loadBabel(ENV.WEBPACK_ENV),
    loadTemplates(ENV.WEBPACK_ENV, ['index',]), // , '5xx', 'missingResource',]),
    loadStyles(ENV.WEBPACK_ENV),
    loadAssets(),
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
        main: [
          'react-hot-loader/patch', // Must be the first array item
          'webpack-hot-middleware/client?reload=true',
          'webpack/hot/dev-server',
          // 'babel-regenerator-runtime', // Allows use of generators in front-end
          path.join(ENV.SRC_FULL_PATH, 'index.jsx'),
        ],
      },
      output: {
        path: ENV.OUT_FULL_PATH,
        publicPath: '/', // Used to help us refer to it using '/' in the index file.
        filename: '[name].[hash:8].js',
      },

      // Prevents weird fs errors. See 'Weird Findings' #6
      externals: {
        fs: 'commonjs fs',
      },
      // node: {
      //   fs: 'empty'
      //   // fs: 'commonjs fs'
      // },

      resolve: {
        modules: ['node_modules', ENV.SRC_FULL_PATH,],
        extensions: ['.js', '.jsx', '.json', '.postcss', 'css', 'html',],
      },

      plugins: [
        webpackProgress,
        new webpack.DefinePlugin(stringifyEnvironment(ENV)), // Webpack sets the app-wide process.env.* variables, but it needs all values to be stringified.
        webpackNamedModules,
        webpackNamedChunks,
        nameNonNormalModules,
        webpackModuleConcatenator,
        webpackInlineManifest,
        HMR,
        // webpackMonitor,
        // webpackBundleAnalyzer,
      ],

      devServer: {
        contentBase: ENV.OUT_FULL_PATH,
        watchContentBase: true,
        hot: true,
        historyApiFallback: true,
        clientLogLevel: ENV.LOG_LEVEL,
        overlay: true,
        progress: true,
      },
    }
  );
};
