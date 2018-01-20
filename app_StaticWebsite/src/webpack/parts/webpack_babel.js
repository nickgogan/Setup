// @ts-check
// @flow

// type args = { include: string, exclude: string, use: [{}] };

// exports.extractCSS = ({ include, exclude = 'node_modules', use }: args) => ({
exports.extractCSS = function() {
  return {
    module: {
      rules: [
        {
          test: /.js$/,
          // include,
          // exclude,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    'env',
                    {
                      targets: {
                        browsers: [
                          'Chrome >= 60',
                          'Safari >= 10.1',
                          'iOS >= 10.3',
                          'Firefox >= 54',
                          'Edge >= 15'
                        ]
                      },
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
    }
  };
};
