require('babel-register');

module.exports = env => {
  console.log(env);

  const webpackConfig = require(`./webpack.config.${env.env}.babel`);

  return webpackConfig;
};
