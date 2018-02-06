require('babel-register');

module.exports = env => {
  const webpackConfig = env.prod
    ? require(`./webpack.config.prod.babel`)
    : require(`./webpack.config.dev.babel`);

  return webpackConfig;
};
