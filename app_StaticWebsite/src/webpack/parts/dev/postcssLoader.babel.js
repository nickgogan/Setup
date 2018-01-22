// @ts-check
// @flow

import PreCSS from 'precss'; // eslint-disable-line
import CSSNext from 'postcss-cssnext'; // eslint-disable-line
import PostCSSImport from 'postcss-import'; // eslint-disable-line

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.postcss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                PostCSSImport, // ({ addDependencyTo: 'webpack' }),
                PreCSS,
                CSSNext({
                  features: {
                    autoprefixer: true,
                    applyRule: false, // Deprecated, so turning off.
                    customProperties: false // Deprecated, so turning off.
                  }
                })
              ]
            }
          }
        ]
      }
    ]
  }
});
