import path from 'path';
import webpack from 'webpack';
import MergePlugin from 'webpack-merge';
import MonitorPlugin from 'webpack-monitor';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import GitRevisionPlugin from 'git-revision-webpack-plugin';
import WebpackManifestPlugin from 'inline-manifest-webpack-plugin';
import PWAManifest from 'webpack-pwa-manifest';
import WebpackCopyPlugin from 'copy-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

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
const webpackBanner = new webpack.BannerPlugin({
  banner: new GitRevisionPlugin().version(),
});
const webpackNamedModules = new webpack.NamedModulesPlugin();
const webpackNamedChunks = new webpack.NamedChunksPlugin(); // Uses the /* webpackChunkName: "..." */ labels
const webpackModuleConcatenator = new webpack.optimize.ModuleConcatenationPlugin();
const webpackInlineManifest = new WebpackManifestPlugin();
const webpackCompression = new CompressionPlugin({
  test: /\.js($|\?)/i,
  algorithm: 'gzip',
  minRatio: 0.8,
  deleteOriginalAssets: true,
});
const webpackPWAManifest = new PWAManifest({
  filename: 'assets-manifest.json', // Don't name as manifest.json - This filename is used internally by htmlWebpackPlugin for the H5 app cache manifest.
  start_url: 'https://static-web-site-16a54.firebaseapp.com/',
  display: 'standalone',
  orientation: 'portrait',
  name: 'My Progressive Web App',
  short_name: 'MyPWA',
  description: 'My awesome Progressive Web App!',
  background_color: '#ffffff',
  theme_color: '#ffffff',
  ios: {
    'apple-mobile-web-app-title': 'AppTitle',
    'apple-mobile-web-app-status-bar-style': 'black',
  },
  icons: [
    {
      src: path.resolve('./src/assets/favicon.png'),
      sizes: [16, 120, 144, 152, 167, 180, 512,],
      ios: true,
    },
  ],
});
const webpackCopy = new WebpackCopyPlugin([
  {
    from: path.resolve(__dirname, '../assets/favicon.ico'),
  },
  // {
  //   from: path.resolve(__dirname, '../assets/.htaccess'),
  // },
  // {
  //   from: path.resolve(__dirname, '../assets/.nginx.conf'),
  // },
]);
const webpackServiceWorker = new OfflinePlugin({
  AppCache: false,
  caches: 'all',
  ServiceWorker: { events: true, minify: true, }, // entry: 'sw-handler.js', },
  excludes: ['.htaccess', '.nginx.conf',],
});
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
export default () => {
  const ENV = setEnvironment('production');

  return MergePlugin(
    loadBabel(ENV.WEBPACK_ENV),
    loadTemplates(ENV.WEBPACK_ENV, ['index',]), // , '5xx', 'missingResource',]),
    loadStyles(ENV.WEBPACK_ENV), // Assets handled by the PostCSS pipeline.
    loadAssets(),
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
      target: ENV.PLATFORM,
      entry: {
        main: [
          'core-js/es6/promise', // TODO:
          // 'babel-regenerator-runtime', // Allows use of generators/yield for sync-looking async code.
          path.join(ENV.SRC_FULL_PATH, 'index.jsx'), // src/main.js
        ],
      },
      output: {
        path: ENV.OUT_FULL_PATH,
        publicPath: '/', // Should hopefully not be needed
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
        extensions: ['.js', '.jsx', '.json', '.postcss', 'css', 'html',],
      },

      plugins: [
        webpackProgress,
        new webpack.DefinePlugin(stringifyEnvironment(ENV)), // Webpack sets the app-wide process.env.* variables, but it needs all values to be stringified.
        webpackBanner,
        webpackNamedModules,
        webpackNamedChunks,
        nameNonNormalModules,
        webpackModuleConcatenator,
        webpackInlineManifest, // For Webpack assets. Inlines into index.html
        webpackPWAManifest, // For the mobile icons. Generates assets.[hash].json
        webpackCopy, // For favicon.png, .htaccess, and .nginx.conf
        webpackServiceWorker, // Caches everything in dist/* and that comes over the network
        // webpackCompression, // Only use to estimate deployment size.
        // webpackMonitor,
        // webpackBundleAnalyzer,
      ],
    }
  );
};
