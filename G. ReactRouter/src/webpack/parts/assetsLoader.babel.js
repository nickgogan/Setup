export default () => ({
  module: {
    rules: [
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/fonts/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/font-woff',
              name: 'assets/fonts/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/octet-stream',
              name: 'assets/fonts/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: 'assets/images/[name].[hash:8].[ext]',
            },
          },
          'img-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ico|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '../assets/fonts/[name].[hash:8].[ext]',
              name: 'assets/images/[name].[hash:8].[ext]',
            },
          },
          'img-loader',
        ],
      },
      // {
      //   test: /\.md($|\?)/i,
      //   exclude: /node_modules/,
      //   use: 'raw-loader',
      // },
    ],
  },
});
