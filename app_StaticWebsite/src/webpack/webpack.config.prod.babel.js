import path from 'path';
import webpack from 'webpack';
import MergePlugin from 'webpack-merge';
import MonitorPlugin from 'webpack-monitor';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import GitRevisionPlugin from 'git-revision-webpack-plugin';
import WebpackManifestPlugin from 'inline-manifest-webpack-plugin';
import PWAManifest from 'webpack-pwa-manifest';
import WebpackCopyPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
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
const webpackModuleConcatenator = new webpack.optimize.ModuleConcatenationPlugin();
const webpackInlineManifest = new WebpackManifestPlugin();
const webpackCompression = new CompressionPlugin({
  test: /\.js($|\?)/i,
  algorithm: 'gzip',
  minRatio: 0.8,
  deleteOriginalAssets: true,
});
const webpackPWAManifest = new PWAManifest({
  filename: 'assets-manifest.json', // Don't name as manifest.json - This filename is used internally by htmlWebpackPlugin for H5 app cache manifest.
  start_url: './index.html',
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
      sizes: [96, 128, 192, 256, 384, 512,], // multiple sizes
      ios: true,
    },
  ],
});
const webpackCopyManifest = new WebpackCopyPlugin([
  {
    from: path.resolve(__dirname, '../assets/favicon.png'),
  },
]);
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
        // Name non-normal modules. Like NormalModulesPlugin, but can handle those and non-normal modules, like external modules.
        nameNonNormalModules,
        webpackModuleConcatenator,
        webpackInlineManifest, // For Webpack assets. Inlines into index.html
        webpackPWAManifest, // For the favicons. Generates assets.[hash].json
        webpackCopyManifest, // Copies the web app's manifest.json with the basic info/
        webpackServiceWorker, // Caches everything in dist/* and that comes over the network
        // webpackCompression,
        // webpackMonitor,
        // webpackBundleAnalyzer
      ],
    }
  );
};
