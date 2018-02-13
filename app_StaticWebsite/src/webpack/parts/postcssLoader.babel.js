import path, { extname } from 'path'; // eslint-disable-line
import glob from 'glob-all'; // eslint-disable-line
import PreCSS from 'precss'; // eslint-disable-line
import CSSNext from 'postcss-cssnext'; // eslint-disable-line
import PostCSSImport from 'postcss-import'; // eslint-disable-line
import PurifyCSSPlugin from 'purifycss-webpack'; // eslint-disable-line
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import PostCSSSmartAsset from 'postcss-smart-asset'; // eslint-disable-line
import PostCSSSVG from 'postcss-svg'; // eslint-disable-line
import PostCSSURLMapper from 'postcss-url-mapper'; // eslint-disable-line
import { getIfUtils, removeEmpty } from 'webpack-config-utils'; // eslint-disable-line
/*
########################################
                        Helpers
########################################
*/
// Correct url()'s in extracted CSS.
function urlMapper(url) {
  return url.replace(/dist/, /\./);
}
/*
########################################
                        Configs


Dev and prod configs for handling CSS
########################################
*/
const prodCSS = extractCSS => {
  const srcPath = path.resolve(__dirname, '../../assets/');
  const distPath = path.resolve(__dirname, '../../../dist/assets');

  return ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          // minimize: true,
          // sourceMap: true,
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]__[local]__[hash:8]',
          // url: false,
          // import: false,
          // root: '/',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            PostCSSImport, // ({ addDependencyTo: 'webpack' }), Deprecated?
            PreCSS,
            CSSNext({
              features: {
                applyRule: false, // Deprecated feature, so turn it off.
                customProperties: false, // Deprecated feature, so turn it off.
              },
            }),
          ],
          sourceMap: true,
        },
      },
    ],
  });
};
const devCSS = [
  'style-loader',
  {
    loader: 'css-loader', // Also allows url-loader to find images
    options: { importLoaders: 1, },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        PostCSSImport, // ({ addDependencyTo: 'webpack' }), Deprecated?
        PreCSS,
        CSSNext({
          features: {
            applyRule: false, // Deprecated, so turning off.
            customProperties: false, // Deprecated, so turning off.
          },
        }),
      ],
    },
  },
];
/*
########################################
                        Plugins
########################################
*/
const extractCSS = new ExtractTextPlugin({
  allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
  filename: 'styles.[contenthash:8].css',
});
const purifyCSS = new PurifyCSSPlugin({
  paths: glob.sync([
    path.join(__dirname, '../../../src/**/*.js'),
    path.join(__dirname, '../../../src/**/*.html'),
  ]),
  minimize: true,
});
/*
########################################
              Exported Webpack Config
########################################
*/
export default env => {
  const { ifProduction, } = getIfUtils(env);

  return {
    module: {
      rules: [
        {
          test: /\.postcss($|\?)/i,
          exclude: /node_modules/,
          use: ifProduction(prodCSS(extractCSS), devCSS),
        },
      ],
    },
    plugins: removeEmpty([ifProduction(extractCSS), purifyCSS,]), // purifyCSS must come after extractCSS
  };
};
