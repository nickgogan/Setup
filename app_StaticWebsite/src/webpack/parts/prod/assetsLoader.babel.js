import path from 'path';

export default () => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|svg)($|\?)/i,
        use: [
          {
            loader: `${require.resolve('url-loader')}`, // `${require.resolve('file-loader')}`,
            options: {
              limit: 800,
              name: './assets/images/[name].[hash:8].[ext]',
            },
          },
          'img-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: `${require.resolve(
            'file-loader'
          )}?name=./assets/fonts/[name].[ext]`, // ?name=./assets/fonts/[name].[ext] url-loader for inlining to prevent FOUC
          // options: {
          //   name: '[name].[hash:8].[ext]', // './assets/fonts/[name].[hash:8].[ext]',
          //   context: path.resolve(__dirname, '../../../assets/fonts'),
          //   outputPath: path.resolve(
          //     __dirname,
          //     '../../../../dist/assets/fonts/'
          //   ),
          //   publicPath: path.resolve(
          //     __dirname,
          //     '../../../../dist/assets/fonts/'
          //   ),
          // },
        },
      },
    ],
  },
});
