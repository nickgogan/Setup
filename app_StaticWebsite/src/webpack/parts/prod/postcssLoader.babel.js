import path from 'path'; // eslint-disable-line
import glob from 'glob-all'; // eslint-disable-line
import PreCSS from 'precss'; // eslint-disable-line
import CSSNext from 'postcss-cssnext'; // eslint-disable-line
import PostCSSImport from 'postcss-import'; // eslint-disable-line
import CSSNano from 'cssnano'; // eslint-disable-line
import WebpackExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import WebpackPurifyCSSPlugin from 'purifycss-webpack'; // eslint-disable-line
import WebpackCriticalCSSPlugin from 'html-critical-webpack-plugin'; //eslint-disable-line

export default () => {
  // Output extracted CSS to a file
  const extractCSS = new WebpackExtractTextPlugin({
    allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
    filename: './styles.bundle.css'
  });
  const purifyCSS = new WebpackPurifyCSSPlugin({
    paths: glob.sync([
      path.join(__dirname, '../../../../src/**/*.js'),
      path.join(__dirname, '../../../../src/**/*.html')
    ]),
    minimize: true
  });
  const criticalCSS = new WebpackCriticalCSSPlugin({
    base: path.resolve(__dirname, '../../../../dist'),
    src: 'index.html',
    dest: 'index.html',
    inline: true,
    minify: false,
    extract: false,
    // Most common viewport size in U.S. in 2017: https://deviceatlas.com/blog/mobile-viewport-size-statistics-2017
    width: 414,
    height: 736,
    penthouse: {
      blockJSRequests: false
    }
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
                    })
                    // CSSNano({ // Now handled by CSSPurify
                    //   autoprefixer: false // On by default, but autoprefixing is handled by CSSNext.
                    // })
                  ]
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [extractCSS, purifyCSS, criticalCSS] // criticalCSS must come at the end.
  };
};
