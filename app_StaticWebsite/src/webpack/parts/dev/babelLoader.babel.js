// @ts-check
// @flow

// type args = { include: string, exclude: string, use: [{}] };

export default () => ({
  module: {
    rules: [
      {
        test: /.js($|\?)/i,
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
  }
});
