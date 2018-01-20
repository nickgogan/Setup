const ExtractTextPlugin = require('extract-text-webpack-plugin');

export default () => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    // `allChunks` is needed with CommonsChunkPlugin to extract
    // from extracted chunks as well.
    allChunks: true,
    filename: '[name].css'
  });

  return {
    module: {
      rules: [
        {
          test: '/.css$/',
          // include,
          // exclude,

          // use: plugin.extract({
          //   use,
          //   fallback: 'style-loader'
          // })
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              },
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('precss'),
                  require('postcss-cssnext')({ browsers: 'ie >= 11' })
                ]
              }
            }
          ]
        }
      ]
    }
    // plugins: [plugin]
  };
};
