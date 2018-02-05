export default () => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|svg)($|\?)/i,
        use: ['url-loader?limit=10000', 'img-loader',],
      },
    ],
  },
});
