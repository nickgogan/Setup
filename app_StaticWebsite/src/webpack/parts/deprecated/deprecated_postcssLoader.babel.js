
// DEPRECATED
import path from 'path'; // eslint-disable-line
import glob from 'glob-all'; // eslint-disable-line
import CSSNext from 'postcss-cssnext'; // eslint-disable-line
import PostCSSImport from 'postcss-import'; // eslint-disable-line
import PostCSSURL from 'postcss-url'; // eslint-disable-line
import PostCSSURLMapper from 'postcss-url-mapper'; // eslint-disable-line
import PreCSS from 'precss'; // eslint-disable-line
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import PurifyCSSPlugin from 'purifycss-webpack'; // eslint-disable-line

export default () => {
  const distPath = path.resolve(__dirname, '../../../../dist');
  function urlMapper(url) {
    return url.replace(/^dist/, '.');
  }
  const extractCSS = new ExtractTextPlugin({
    allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
    filename: 'styles.[contenthash:8].css',
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
            publicPath: distPath,
            use: [
              // PostCSS handles both fonts and images
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
                loader: 'postcss-loader', // eslint-disable-line
                options: {
                  plugins: () => [
                    PostCSSURL({
                      url: 'copy',
                      basePath: path.join(__dirname, '../../../assets/'),
                      assetsPath: path.join(distPath, 'assets'),
                      // useHash: true // This messes up the output folder structure.
                    }),
                    PostCSSImport, // ({ addDependencyTo: 'webpack' }), Deprecated?
                    PreCSS,
                    CSSNext({
                      features: {
                        applyRule: false, // Deprecated
                        customProperties: false, // Deprecated
                      },
                    }),
                    PostCSSURLMapper(urlMapper),
                  ],
                },
              },
            ],
          }),
        },
      ],
    },
    plugins: [purifyCSS, extractCSS,], // extractCSS,
  };
};
// DEPRECATED