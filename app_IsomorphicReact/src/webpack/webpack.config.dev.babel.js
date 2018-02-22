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
// TODO
// import loadBabel from './parts/babelLoader.babel';
// import loadAssets from './parts/assetsLoader.babel';
// import loadTemplates from './parts/templatesLoader.babel';
// import loadStyles from './parts/postcssLoader.babel';
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
  console.log(ENV);

  return MergePlugin(
    // extractBundles([
    //   {
    //     name: 'vendor',
    //     minChunks: ({ resource, }) => /node_modules/.test(resource), // Only pull in that used code from node_modules.
    //   },
    //   {
    //     name: 'manifest',
    //     filename: 'webpack-runtime.[hash:8].js',
    //     minChunks: Infinity,
    //   },
    //   {
    //     async: true,
    //     children: true,
    //     name: 'CommonLazy',
    //   },
    // ]),
    {
      target: ENV.PLATFORM,
      entry: {
        main: [
          'react-hot-loader/patch',
          'webpack-hot-middleware/client?reload=true',
          'webpack/hot/dev-server',
          'babel-regenerator-runtime',
          // path.resolve(__dirname, '../../src/'),
          path.join(ENV.SRC_FULL_PATH), // , 'main.js'),
        ],
      },
      output: {
        // path: path.resolve(__dirname, '../../public'),
        path: ENV.OUT_FULL_PATH,
        publicPath: '/', // Used to help us refer to it using '/' in the index file.
        // filename: '[name].[chunkhash:8].js', // TODO
        filename: 'bundle.js',
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
        // TODO
        modules: ['node_modules', ENV.SRC_FULL_PATH,],
        extensions: ['.js', '.jsx', '.json', '.postcss', 'css', 'scss', 'html',],
      },

      plugins: [
        webpackProgress,
        // TODO
        // new webpack.DefinePlugin(stringifyEnvironment(ENV)), // Webpack sets the app-wide process.env.* variables, but it needs all values to be stringified.
        webpackNamedModules,
        webpackNamedChunks,
        // Name non-normal modules. Like NormalModulesPlugin, but can handle those and non-normal modules, like external modules.
        nameNonNormalModules,
        webpackModuleConcatenator,
        webpackInlineManifest,
        HMR,
        // webpackMonitor,
        // webpackBundleAnalyzer,
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('development'),
            WEBPACK: true,
          },
        }),
      ],

      module: {
        rules: [
          {
            test: /\.jsx?/,
            use: {
              loader: 'babel-loader',
            },
            exclude: /node_modules/,
            include: path.resolve(__dirname, '../../src'),
          },
        ],
      },

      // TODO
      devServer: {
        contentBase: '../../public',
        hot: true,
        watchContentBase: true,
        historyApiFallback: true,
        clientLogLevel: ENV.LOG_LEVEL,
        overlay: true,
        progress: true,
      },
    }
  );
};
