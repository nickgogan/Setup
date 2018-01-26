import path from 'path'; // eslint-disable-line
import glob from 'glob-all'; // eslint-disable-line
import PreCSS from 'precss'; // eslint-disable-line
import CSSNext from 'postcss-cssnext'; // eslint-disable-line
import PostCSSImport from 'postcss-import'; // eslint-disable-line
import WebpackExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import WebpackPurifyCSSPlugin from 'purifycss-webpack'; // eslint-disable-line

export default () => {
  const extractCSS = new WebpackExtractTextPlugin({
    allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
    filename: './styles.[contenthash:8].css',
  });
  const purifyCSS = new WebpackPurifyCSSPlugin({
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
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
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
    plugins: [extractCSS, purifyCSS],
  };
};
