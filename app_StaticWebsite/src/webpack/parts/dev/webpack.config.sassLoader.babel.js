import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = () => {
    // Output extracted CSS to a file
    const extractCSS = new ExtractTextPlugin({
      allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
      filename: '[name].css'
    });

    return {
      module: {
        rules: [
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              },
              loader: 'sass-loader',

            }
          ]
        ]
      },
      plugins: [extractCSS]
    }
}