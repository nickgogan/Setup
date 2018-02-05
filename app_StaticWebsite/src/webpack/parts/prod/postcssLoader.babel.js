import path from 'path'; // eslint-disable-line
import glob from 'glob-all'; // eslint-disable-line
import CSSNext from 'postcss-cssnext'; // eslint-disable-line
import PostCSSImport from 'postcss-import'; // eslint-disable-line
import PostCSSURL from 'postcss-url'; // eslint-disable-line
import PreCSS from 'precss'; // eslint-disable-line
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import PurifyCSSPlugin from 'purifycss-webpack'; // eslint-disable-line

export default () => {
  const assetsPath = path.resolve(__dirname, '../../../../dist');

  const extractCSS = new ExtractTextPlugin({
    allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
    filename: 'styles.[contenthash:8].css',
    publicPath: assetsPath,
  });
  const purifyCSS = new PurifyCSSPlugin({
    paths: glob.sync([
      path.join(__dirname, '../../../../src/**/*.js'),
      path.join(__dirname, '../../../../src/**/*.html'),
    ]),
    minimize: true,
  });

  return {
    module: {
      rules: [
        {
          test: /\.postcss($|\?)/i,
          exclude: /node_modules/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              // PostCSS handles both fonts and images
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  url: false,
                },
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    PostCSSURL({
                      url: 'copy',
                      basePath: path.join(__dirname, '../../../assets/'),
                      assetsPath: path.join(assetsPath, '../dist/assets/'),
                      useHash: true,
                    }),
                    PostCSSImport, // ({ addDependencyTo: 'webpack' }), Deprecated?
                    PreCSS,
                    CSSNext({
                      features: {
                        applyRule: false, // Deprecated
                        customProperties: false, // Deprecated
                      },
                    }),
                  ],
                },
              },
            ],
          }),
        },
      ],
    },
    plugins: [extractCSS, purifyCSS,], //
  };
};
