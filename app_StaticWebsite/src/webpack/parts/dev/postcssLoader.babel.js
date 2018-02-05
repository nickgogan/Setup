import path from 'path'; // eslint-disable-line
import glob from 'glob-all'; // eslint-disable-line
import PreCSS from 'precss'; // eslint-disable-line
import CSSNext from 'postcss-cssnext'; // eslint-disable-line
import PostCSSImport from 'postcss-import'; // eslint-disable-line
import PostCSSURL from 'postcss-url'; // eslint-disable-line
import PurifyCSSPlugin from 'purifycss-webpack'; // eslint-disable-line

export default () => {
  const assetsPath = path.resolve(__dirname, '../../../../dist');

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
          use: [
            'style-loader',
            {
              loader: 'css-loader', // Also allows url-loader to find images
              options: { importLoaders: 1, },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  PostCSSURL({
                    url: 'copy',
                    basePath: path.join(__dirname, '../../../assets'),
                    assetsPath: path.join(assetsPath, 'dist/assets'),
                  }),
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
          ],
        },
      ],
    },
    plugins: [purifyCSS,],
  };
};
