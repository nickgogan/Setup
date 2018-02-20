import path from 'path';
import webpack from 'webpack';

export default {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'babel-regenerator-runtime',
    path.resolve(__dirname, 'src/'),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/', // Used to help us refer to it using '/' in the index file.
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true,
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json',],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
};
