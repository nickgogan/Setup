import path, { extname } from 'path'; // eslint-disable-line
import glob from 'glob-all'; // eslint-disable-line
import combineLoaders from 'webpack-combine-loaders'; // eslint-disable-line
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import PurifyCSSPlugin from 'purifycss-webpack'; // eslint-disable-line
import { getIfUtils, removeEmpty } from 'webpack-config-utils'; // eslint-disable-line

/*
########################################
                        Configs

Dev and prod configs for handling CSS
########################################
*/
const prodCSS = () =>
  ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: combineLoaders([
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: 'purified-[name]__[local]__[hash:8]',
        },
      },
      'postcss-loader',
    ]),
  });
const devCSS = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
      localIdentName: 'purified-[name]__[local]__[hash:8]',
    },
  },
  'postcss-loader',
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
  purifyOptions: {
    whitelist: ['*purified*',],
  },
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
