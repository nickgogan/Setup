import path from 'path';
import webpack from 'webpack';

export default {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/dev-server',
    'babel-regenerator-runtime',
    path.resolve(__dirname, 'src/'),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/', // Used to help us refer to it using '/' in the index file.
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
  devServer: {
    hot: true,
    contentBase: './public',
  },
};
