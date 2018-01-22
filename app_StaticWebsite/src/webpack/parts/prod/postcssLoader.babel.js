import PreCSS from 'precss'; // eslint-disable-line
import CSSNext from 'postcss-cssnext'; // eslint-disable-line
import PostCSSImport from 'postcss-import'; // eslint-disable-line
import CSSNano from 'cssnano'; // eslint-disable-line
import WebpackExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import WebpackPurifyCSSPlugin from 'purifycss-webpack'; // eslint-disable-line

export default () => {
  // Output extracted CSS to a file
  const extractCSS = new WebpackExtractTextPlugin({
    allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
    filename: './styles.bundle.css'
  });
  const purifyCSS = new WebpackPurifyCSSPlugin({});

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
                  importLoaders: 1
                },
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    PostCSSImport, // ({ addDependencyTo: 'webpack' }), Deprecated?
                    PreCSS,
                    CSSNext({
                      features: {
                        applyRule: false, // Deprecated
                        customProperties: false // Deprecated
                      }
                    }),
                    CSSNano({
                      autoprefixer: false // On by default, but autoprefixing is handled by CSSNext.
                    })
                  ]
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [extractCSS]
  };
};
