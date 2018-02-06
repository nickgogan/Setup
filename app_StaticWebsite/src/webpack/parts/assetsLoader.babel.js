export default () => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|svg)($|\?)/i,
        use: [
          {
            loader: 'url-loader', // `${require.resolve('file-loader')}`,
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
          loader: 'file-loader', // url-loader for inlining to prevent FOUC
          options: {
            name: './assets/fonts/[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },
});
