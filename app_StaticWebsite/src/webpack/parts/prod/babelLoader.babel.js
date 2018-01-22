// @ts-check
// @flow
import WebpackUglifyJSPlugin from 'uglifyjs-webpack-plugin'; //eslint-disable-line

// type args = { include: string, exclude: string, use: [{}] };

module.exports = () => {
  // Minify JS.
  const Uglifier = new WebpackUglifyJSPlugin({
    cache: true, // Default dir: node_modules/.cache/uglifyjs-webpack-plugin.
    parallel: true,
    uglifyOptions: {
      ie8: false
    }
  });

  return {
    module: {
      rules: [
        {
          test: /\.js($|\?)/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader?cacheDirectory',
              options: {
                presets: [
                  [
                    'env',
                    {
                      // Handled in package.json
                      // targets: {
                      //   browsers: [
                      //     'Chrome >= 60',
                      //     'Safari >= 10.1',
                      //     'iOS >= 10.3',
                      //     'Firefox >= 54',
                      //     'Edge >= 15'
                      //   ]
                      // },
                      modules: false,
                      useBuiltIns: true,
                      debug: false
                    }
                  ],
                  'flow'
                ],
                plugins: [
                  'babel-plugin-syntax-dynamic-import',
                  'transform-runtime'
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [Uglifier]
  };
};
