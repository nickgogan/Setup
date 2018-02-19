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
// const webpackSourceMaps = new webpack.SourceMapDevToolPlugin({
//   filename: '[name].[chunkhash:8].map',
//   // Excluded by chunk names
//   exclude: ['vendor', 'hmr', 'webpack-runtime', 'sw',],
// });
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

export default env => {
  const ENV = setEnvironment(env);

  return MergePlugin(
    loadBabel(ENV.WEBPACK_ENV),
    loadTemplates(ENV.WEBPACK_ENV, [
      'index',
      // 'unreachableServer',
      '5xx',
      'missingResource',
    ]),
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
        main: [path.join(ENV.SRC_FULL_PATH, 'main.js'),],
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
        extensions: ['.js', '.jsx', '.postcss', 'css', 'scss', 'html',],
      },

      plugins: [
        webpackProgress,
        new webpack.DefinePlugin(stringifyEnvironment(ENV)), // Webpack sets the app-wide process.env.* variables, but it needs all values to be stringified.
        // webpackSourceMaps,
        webpackNamedModules,
        webpackNamedChunks,
        // Name non-normal modules. Like NormalModulesPlugin, but can handle those and non-normal modules, like external modules.
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
