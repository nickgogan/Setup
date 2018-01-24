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
                    modules: false, // Lets webpack deal with the imports.
                    useBuiltIns: true, // Enables polyfills.
                    debug: false
                  }
                ],
                'flow'
              ],
              plugins: [
                'babel-plugin-syntax-dynamic-import', // Enables things like lazy-loading.
                'transform-runtime' // Prevents polution of global scope with Promise objects.
              ]
            }
          }
        ]
      }
    ]
  }
});
