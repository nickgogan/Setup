import PreCSS from 'precss';
import CSSNext from 'postcss-cssnext';
import PostCSSImport from 'postcss-import';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = () => {
  // Output extracted CSS to a file
  const extractText = new ExtractTextPlugin({
    allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
    filename: './styles.bundle.css'
  });

  return {
    module: {
      rules: [
        {
          test: /\.postcss$/,
          exclude: /node_modules/,
          use: extractText.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  sourceMap: true
                },
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: () => [
                    PostCSSImport({ addDependencyTo: 'webpack' }),
                    PreCSS,
                    CSSNext({
                      features: {
                        autoprefixer: true,
                        applyRule: false, // Deprecated
                        customProperties: false, // Deprecated
                        compress: true
                      }
                    })
                  ]
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [extractText]
  };
};
