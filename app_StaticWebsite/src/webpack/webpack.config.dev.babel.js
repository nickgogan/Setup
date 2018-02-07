import path from 'path';
import dotEnv from 'dotenv-safe';
import webpack from 'webpack';
import MergePlugin from 'webpack-merge';
import DotenvPlugin from 'dotenv-webpack';
import MonitorPlugin from 'webpack-monitor';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import InlineManifestPlugin from 'inline-manifest-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils'; // eslint-disable-line
import setEnvironment from './helpers/setEnvironment';
/*
########################################
        Create env and import Loaders
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
// const webpackSourceMaps = new webpack.SourceMapDevToolPlugin({
//   filename: '[name].[chunkhash:8].map',
//   // Excluded by chunk names
//   exclude: ['vendor', 'hmr', 'webpack-runtime', 'sw',],
// });
const webpackNamedModules = new webpack.NamedModulesPlugin();
const webpackNamedChunks = new webpack.NamedChunksPlugin(); // Uses the /* webpackChunkName: "..." */ labels
// Name non-normal modules. Like NormalModulesPlugin, but can handle those and non-normal modules, like external modules., new OfflinePlugin(),], // , webpackMonitor
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

module.exports = env => {
  const ENV = setEnvironment(env);
  const { ifProduction, ifNotProduction, } = getIfUtils(ENV.WEBPACK_ENV);

  return MergePlugin(
    loadBabel(ENV.WEBPACK_ENV),
    loadTemplates(ENV.WEBPACK_ENV, ['index', '404', '500',]),
    loadStyles(),
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
        main: [path.join(ENV.SRC_FULL_PATH, 'js/main.js'),],
        hmr: [
          'webpack/hot/dev-server',
          `webpack-dev-server/client?http://localhost:3001`,
        ],
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
        new DotenvPlugin(ENV), // Webpack sets the app-wide process.env.* variables.
        // webpackSourceMaps,
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
        contentBase: path.join(ENV.OUT_FULL_PATH, 'assets'),
        watchContentBase: true,
        host: ENV.HOST,
        port: ENV.PORT,
        historyApiFallback: true,
        clientLogLevel: ENV.LOG_LEVEL,
        overlay: true,
        progress: true,
      },
    }
  );
};
