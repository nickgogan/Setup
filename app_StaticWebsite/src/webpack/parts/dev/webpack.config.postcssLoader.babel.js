import PreCSS from 'precss';
import CSSNext from 'postcss-cssnext';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = () => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
    filename: '[name].css'
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              },
              loader: 'postcss-loader',
              options: {
                plugins: () => [PreCSS, CSSNext({ browsers: 'ie >= 11' })]
              }
            }
          ]
        }
      ]
    }
    // plugins: [ExtractTextPlugin]
  };
};
