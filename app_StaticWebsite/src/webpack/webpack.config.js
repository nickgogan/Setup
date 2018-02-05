require('babel-register');

module.exports = env => {
  const webpackConfig = require(`./webpack.config.${env.env}.babel`);

  return webpackConfig;
};
